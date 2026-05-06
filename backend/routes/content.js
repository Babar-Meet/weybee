const express = require('express');
const PageContent = require('../models/PageContent');
const ActivityLog = require('../models/ActivityLog');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/content/list - Admin: list all pages
router.get('/list', auth, authorize('admin', 'manager', 'developer'), async (req, res) => {
  try {
    const pages = await PageContent.find().select('pageSlug title isPublished updatedAt').sort('pageSlug');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/content/:pageSlug - Public: fetch page content
router.get('/:pageSlug', async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageSlug: req.params.pageSlug, isPublished: true });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/content/:pageSlug - Dev/Admin: update full page
router.put('/:pageSlug', auth, authorize('admin', 'manager', 'developer'), async (req, res) => {
  try {
    const updateData = { ...req.body, lastEditedBy: req.user._id };
    const page = await PageContent.findOneAndUpdate(
      { pageSlug: req.params.pageSlug },
      updateData,
      { new: true, upsert: true }
    );
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/content/:pageSlug/section/:sectionId - Update single section
router.put('/:pageSlug/section/:sectionId', auth, authorize('admin', 'manager', 'developer'), async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageSlug: req.params.pageSlug });
    if (!page) return res.status(404).json({ error: 'Page not found' });

    const section = page.sections.find(s => s.sectionId === req.params.sectionId);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    const oldSection = JSON.parse(JSON.stringify(section));

    Object.assign(section, req.body);
    page.lastEditedBy = req.user._id;
    await page.save();

    await ActivityLog.create({
      userId: req.user._id,
      action: 'content_edit',
      details: `Edited section "${req.params.sectionId}" on page "${req.params.pageSlug}"`,
      page: req.params.pageSlug,
      metadata: {
        oldData: oldSection,
        newData: req.body
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/content/:pageSlug/section - Add new section
router.post('/:pageSlug/section', auth, authorize('admin', 'manager', 'developer'), async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageSlug: req.params.pageSlug });
    if (!page) return res.status(404).json({ error: 'Page not found' });

    page.sections.push(req.body);
    page.lastEditedBy = req.user._id;
    await page.save();
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/content/:pageSlug/section/:sectionId - Remove section
router.delete('/:pageSlug/section/:sectionId', auth, authorize('admin', 'manager', 'developer'), async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageSlug: req.params.pageSlug });
    if (!page) return res.status(404).json({ error: 'Page not found' });

    page.sections = page.sections.filter(s => s.sectionId !== req.params.sectionId);
    page.lastEditedBy = req.user._id;
    await page.save();
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
