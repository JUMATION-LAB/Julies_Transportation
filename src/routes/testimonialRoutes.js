const express = require('express');
const router = express.Router();

const testimonialController = require('../controllers/testimonialController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateTestimonial } = require('../middleware/validateTestimonial');
const { authenticate } = require('../middleware/authenticate');

router.get('/testimonials', testimonialController.getTestimonials);
router.get('/testimonials/:id', validateUUID, testimonialController.getTestimonial);
router.post('/testimonials', authenticate, validateTestimonial, testimonialController.createTestimonial);
// router.patch('/testimonials/:id', validateUUID, validateTestimonialUpdate, testimonialController.updateTestimonial);
router.patch('/testimonials/:id',authenticate, validateUUID, validateTestimonial, testimonialController.updateTestimonial);
router.delete('/testimonials/:id',authenticate, validateUUID, testimonialController.deleteTestimonial);

module.exports = router;