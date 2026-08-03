const express = require('express');
const router = express.Router();

const galleryController = require('../controllers/galleryController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateGallery, validateGalleryUpdate } = require('../middleware/validateGallery');

router.get('/gallery', galleryController.getGalleryItems);
router.get('/gallery/:id', validateUUID, galleryController.getGalleryItem);
router.post('/gallery', validateGallery, galleryController.createGalleryItem);
router.patch('/gallery/:id', validateUUID, validateGalleryUpdate, galleryController.updateGalleryItem);
router.delete('/gallery/:id', validateUUID, galleryController.deleteGalleryItem);

module.exports = router;