const express = require('express');
const VisitorLog = require('../models/VisitorLog');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// POST /api/track - Public: track any visitor action (anonymous or logged in)
router.post('/', async (req, res) => {
  try {
    const { sessionId, action, page, details, screenResolution, language, platform, referrer, duration, location, clientIp } = req.body;
    
    // Get IP - prefer client fetched IP (since localhost always shows ::1), fallback to request IP
    const ipAddress = clientIp || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.connection?.remoteAddress;

    const log = new VisitorLog({
      sessionId,
      userId: req.user?._id || null,
      ipAddress,
      userAgent: req.get('User-Agent'),
      referrer: referrer || req.get('Referer'),
      screenResolution,
      platform,
      action,
      page,
      details,
      duration,
      location
    });
    await log.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/track/stats - Admin: get visitor stats
router.get('/stats', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const totalVisits = await VisitorLog.countDocuments({ action: 'page_view' });
    const visits24h = await VisitorLog.countDocuments({ action: 'page_view', createdAt: { $gte: last24h } });
    const visits7d = await VisitorLog.countDocuments({ action: 'page_view', createdAt: { $gte: last7d } });
    const uniqueSessions = await VisitorLog.distinct('sessionId').then(s => s.length);
    const uniqueIPs = await VisitorLog.distinct('ipAddress').then(s => s.length);

    // Top pages
    const topPages = await VisitorLog.aggregate([
      { $match: { action: 'page_view' } },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);

    // Recent visitors
    const recentVisitors = await VisitorLog.find({ action: 'page_view' })
      .populate('userId', 'name email')
      .sort('-createdAt')
      .limit(50)
      .select('sessionId userId ipAddress page platform location createdAt');

    // Platforms breakdown
    const platforms = await VisitorLog.aggregate([
      { $match: { action: 'page_view', platform: { $ne: null } } },
      { $group: { _id: '$platform', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalVisits, visits24h, visits7d, uniqueSessions, uniqueIPs,
      topPages, recentVisitors, platforms
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
