const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: [
        "login",
        "logout",
        "page_visit",
        "form_submit",
        "profile_update",
        "user_created",
        "user_updated",
        "user_deleted",
        "content_edit",
      ],
      required: true,
    },
    details: { type: String }, // e.g. "Visited /about-us"
    page: { type: String }, // route path
    metadata: { type: mongoose.Schema.Types.Mixed }, // To store old/new data
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true },
);

// Index for fast queries on dashboard
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model("ActivityLog", activityLogSchema);
