const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const Contact = require("./models/Contact");

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const contentRoutes = require("./routes/content");
const trackRoutes = require("./routes/track");
const chatbotRoutes = require("./routes/chatbot");

// Seeders
const seedContent = require("./seedContent");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===== DB Connection (Serverless-safe) =====
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is missing!");
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("✅ Connected to MongoDB successfully!");
    await seedAdmin();
    await seedContent();
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    throw err; // Re-throw so the error handler catches it
  }
};

// Ensure DB is connected BEFORE any API route runs
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// ===== API Routes =====
app.get("/api/health", (req, res) => {
  res.json({
    status: "API is running!",
    time: new Date().toISOString(),
    dbConnected: isConnected,
  });
});

// Contact form (public)
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).json({ message: "Message received successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/track", trackRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Seed initial admin user
async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const admin = new User({
        name: "Admin",
        email: "admin@weybee.com",
        password: "AdminPassword123!",
        role: "admin",
      });
      await admin.save();
      console.log("✅ Default admin created:", admin.email);
    }
  } catch (err) {
    console.error("Admin seed error:", err.message);
  }
}

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    mongoUriExists: !!process.env.MONGO_URI,
  });
});

const PORT = process.env.PORT || 5000;

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export the Express API
module.exports = app;
