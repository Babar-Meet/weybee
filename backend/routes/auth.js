const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const { auth, JWT_SECRET, JWT_EXPIRY } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register - Public registration (creates 'user' role)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered.' });

    const user = new User({ name, email, password, role: 'user' });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    // Log registration
    await ActivityLog.create({
      userId: user._id,
      action: 'login',
      details: 'New user registered and logged in',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    user.lastLogin = new Date();
    await user.save();

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password.' });
    if (!user.isActive) return res.status(403).json({ error: 'Account is deactivated.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password.' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    // Log login
    await ActivityLog.create({
      userId: user._id,
      action: 'login',
      details: `User logged in (${user.role})`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    user.lastLogin = new Date();
    await user.save();

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/logout
router.post('/logout', auth, async (req, res) => {
  try {
    await ActivityLog.create({
      userId: req.user._id,
      action: 'logout',
      details: 'User logged out',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    res.json({ message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/auth/me - Get current user profile
router.get('/me', auth, async (req, res) => {
  res.json({ user: req.user });
});

// POST /api/auth/log-visit - Log page visit (authenticated users only)
router.post('/log-visit', auth, async (req, res) => {
  try {
    const { page } = req.body;
    await ActivityLog.create({
      userId: req.user._id,
      action: 'page_visit',
      details: `Visited ${page}`,
      page,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
