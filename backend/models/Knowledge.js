const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  source: { type: String, default: 'web_search' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Knowledge', knowledgeSchema);
