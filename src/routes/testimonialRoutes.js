const express = require('express');
const router = express.Router();

const testimonialController = require('../controllers/testimonialController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateTestimonial, validateTestimonialUpdate } = require('../middleware/validateTestimonial');
const { authorize } = require('../middleware/authorize');

router.get('/testimonials', testimonialController.getTestimonials);
router.get('/testimonials/:id', validateUUID, testimonialController.getTestimonial);
router.post('/testimonials', validateTestimonial,authorize('admin'), testimonialController.createTestimonial);
// router.patch('/testimonials/:id', validateUUID, validateTestimonialUpdate, testimonialController.updateTestimonial);
router.delete('/testimonials/:id', validateUUID,authorize('admin'), testimonialController.deleteTestimonial);

module.exports = router;