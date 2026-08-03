const testimonialService = require('../services/testimonialService');
const { asyncHandler } = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await testimonialService.getTestimonials();
    return successResponse(res, 200, 'Testimonials retrieved successfully.', testimonials);
});

const getTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await testimonialService.getTestimonial(req.params.id);
    return successResponse(res, 200, 'Testimonial retrieved successfully.', testimonial);
});

const createTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await testimonialService.createTestimonial(req.body);
    return successResponse(res, 201, 'Testimonial created successfully.', testimonial);
});

const updateTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
    return successResponse(
        res,
        200,
        'Testimonial updated successfully.',
        testimonial
    );
});

const deleteTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await testimonialService.deleteTestimonial(req.params.id);
    return successResponse(res, 200, 'Testimonial deleted successfully.', testimonial);
});

module.exports = {
    getTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};