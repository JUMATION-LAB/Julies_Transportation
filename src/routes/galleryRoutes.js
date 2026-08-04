const express = require('express');
const router = express.Router();

const galleryController = require('../controllers/galleryController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateGallery, validateGalleryUpdate } = require('../middleware/validateGallery');
const { authenticate } = require('../middleware/authenticate');

router.get('/gallery', galleryController.getGalleryItems);
router.get('/gallery/:id', validateUUID, galleryController.getGalleryItem);
router.post('/gallery',authenticate, validateGallery, galleryController.createGalleryItem);
router.patch('/gallery/:id', authenticate, validateUUID, validateGalleryUpdate, galleryController.updateGalleryItem);
router.delete('/gallery/:id',authenticate, validateUUID, galleryController.deleteGalleryItem);

module.exports = router;