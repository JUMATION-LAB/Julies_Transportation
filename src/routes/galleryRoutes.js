const express = require('express');
const router = express.Router();

const galleryController = require('../controllers/galleryController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateGallery, validateGalleryUpdate } = require('../middleware/validateGallery');
const { authorize } = require('../middleware/authorize');

router.get('/gallery', galleryController.getGalleryItems);
router.get('/gallery/:id', validateUUID, galleryController.getGalleryItem);
router.post('/gallery', validateGallery, authorize('admin'), galleryController.createGalleryItem);
router.patch('/gallery/:id', validateUUID, authorize('admin'), validateGalleryUpdate, galleryController.updateGalleryItem);
router.delete('/gallery/:id', validateUUID,authorize('admin'), galleryController.deleteGalleryItem);

module.exports = router;