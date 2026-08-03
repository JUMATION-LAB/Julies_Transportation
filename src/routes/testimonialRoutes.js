const express = require('express');
const router = express.Router();

const testimonialController = require('../controllers/testimonialController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateTestimonial, validateTestimonialUpdate } = require('../middleware/validateTestimonial');

router.get('/testimonials', testimonialController.getTestimonials);
router.get('/testimonials/:id', validateUUID, testimonialController.getTestimonial);
router.post('/testimonials', validateTestimonial, testimonialController.createTestimonial);
// router.patch('/testimonials/:id', validateUUID, validateTestimonialUpdate, testimonialController.updateTestimonial);
router.delete('/testimonials/:id', validateUUID, testimonialController.deleteTestimonial);

module.exports = router;