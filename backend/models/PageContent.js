const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  sectionId: { type: String, required: true },
  order: { type: Number, default: 0 },
  heading: { type: String },
  subheading: { type: String },
  text: { type: String },
  image: { type: String },
  bgColor: { type: String, default: '#fff' },
  items: [{
    title: { type: String },
    description: { type: String },
    icon: { type: String },
    image: { type: String },
    link: { type: String }
  }]
}, { _id: true, strict: false });

const pageContentSchema = new mongoose.Schema({
  pageSlug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  metaDescription: { type: String },
  sections: [sectionSchema],
  isPublished: { type: Boolean, default: true },
  lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true, strict: false });

pageContentSchema.index({ pageSlug: 1 });

module.exports = mongoose.model('PageContent', pageContentSchema);
