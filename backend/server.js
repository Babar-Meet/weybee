const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Contact = require('./models/Contact');

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');
const trackRoutes = require('./routes/track');

// Seeders
const seedContent = require('./seedContent');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running!', time: new Date().toISOString() });
});

// Contact form (public)
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/track', trackRoutes);

// Seed initial admin user
async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@weybee.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Default admin created:', admin.email);
    }
  } catch (err) {
    console.error('Admin seed error:', err.message);
  }
}

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log('✅ Connected to MongoDB successfully!');
    await seedAdmin();
    await seedContent();
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  }
};

// Ensure DB is connected before processing any API route
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const PORT = process.env.PORT || 5000;

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export the Express API
module.exports = app;
