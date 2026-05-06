const express = require('express');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const Contact = require('../models/Contact');
const Knowledge = require('../models/Knowledge');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require auth + admin or manager role

// GET /api/admin/stats - Dashboard stats
router.get('/stats', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalLogins = await ActivityLog.countDocuments({ action: 'login' });
    const totalPageVisits = await ActivityLog.countDocuments({ action: 'page_visit' });
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });

    // Logins in last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLogins = await ActivityLog.countDocuments({ action: 'login', createdAt: { $gte: last24h } });

    // Users by role
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Top visited pages
    const topPages = await ActivityLog.aggregate([
      { $match: { action: 'page_visit' } },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalUsers, activeUsers, totalLogins, totalPageVisits,
      totalContacts, newContacts, recentLogins,
      usersByRole, topPages
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/users - List all users
router.get('/users', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/users - Create custom user (admin only)
router.post('/users', auth, authorize('admin'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists.' });

    const user = new User({ name, email, password, role, createdBy: req.user._id });
    await user.save();

    // Log user creation
    await ActivityLog.create({
      userId: req.user._id,
      action: 'user_created',
      details: `Created ${role} user: ${email}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({ message: 'User created successfully.', user: { id: user._id, name, email, role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/admin/users/:id - Update user (admin only)
router.put('/users/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { name, email, role, isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, isActive },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found.' });

    await ActivityLog.create({
      userId: req.user._id,
      action: 'user_updated',
      details: `Updated user: ${user.email} (role: ${role}, active: ${isActive})`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/admin/users/:id - Delete user (admin only)
router.delete('/users/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    await ActivityLog.create({
      userId: req.user._id,
      action: 'user_deleted',
      details: `Deleted user: ${user.email}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/activity - Activity logs
router.get('/activity', auth, authorize('admin', 'manager', 'developer'), async (req, res) => {
  try {
    const { limit = 50, action, userId } = req.query;
    const filter = {};
    if (action) filter.action = action;
    if (userId) filter.userId = userId;

    const logs = await ActivityLog.find(filter)
      .populate('userId', 'name email role')
      .sort('-createdAt')
      .limit(parseInt(limit));

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/contacts - Contact form submissions
router.get('/contacts', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/knowledge - Get all dynamic knowledge entries
router.get('/knowledge', auth, authorize('admin', 'developer'), async (req, res) => {
  try {
    const records = await Knowledge.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/admin/knowledge/:id - Verify/Edit a knowledge entry
router.put('/knowledge/:id', auth, authorize('admin', 'developer'), async (req, res) => {
  try {
    const { answer, isVerified } = req.body;
    const record = await Knowledge.findByIdAndUpdate(req.params.id, { answer, isVerified }, { new: true });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
