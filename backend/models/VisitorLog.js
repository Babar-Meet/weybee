const mongoose = require('mongoose');

const visitorLogSchema = new mongoose.Schema({
  sessionId: { type: String },                // generated client-side UUID
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // null if anonymous
  ipAddress: { type: String },
  userAgent: { type: String },
  platform: { type: String }, // Windows, macOS, Android
  screenResolution: { type: String },
  referrer: { type: String },
  location: {
    city: { type: String },
    region: { type: String },
    country: { type: String },
    isp: { type: String }
  },
  timeSpent: { type: Number, default: 0 }, // seconds spent on page
  action: {
    type: String,
    enum: ['page_view', 'click', 'form_submit', 'scroll', 'session_start', 'session_end'],
    default: 'page_view'
  },
  page: { type: String },
  details: { type: String },
  duration: { type: Number },                  // time spent in seconds
}, { timestamps: true });

visitorLogSchema.index({ sessionId: 1, createdAt: -1 });
visitorLogSchema.index({ ipAddress: 1 });
visitorLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model('VisitorLog', visitorLogSchema);
