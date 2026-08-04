const { AppError } = require('../utils/AppError');


const allowedFields = [
    'customer_name',
    'customer_role',
    'message',
    'rating',
    'image_url',
    'is_active',
    'display_order'
];

const cleanBody = (body) => {
    return Object.fromEntries(Object.entries(body).filter(([field]) => allowedFields.includes(field)));
};

const validateTestimonial = (req, res, next) => {
    const testimonial = cleanBody(req.body);
    const errors = [];

    if (typeof testimonial.customer_name !== 'string' || !testimonial.customer_name.trim()) {
        errors.push({
            field: 'customer_name',
            message: 'Customer name is required.'
        });
    }

    if (typeof testimonial.message !== 'string' || !testimonial.message.trim()) {
        errors.push({
            field: 'message',
            message: 'Testimonial message is required.'
        });
    }

    if (
        testimonial.customer_role !== undefined &&
        testimonial.customer_role !== null &&
        typeof testimonial.customer_role !== 'string'
    ) {
        errors.push({
            field: 'customer_role',
            message: 'Customer role must be a string or null.'
        });
    }

    if (
        testimonial.image_url !== undefined &&
        testimonial.image_url !== null &&
        typeof testimonial.image_url !== 'string'
    ) {
        errors.push({
            field: 'image_url',
            message: 'Image URL must be a string or null.'
        });
    }

    if (
        testimonial.rating !== undefined &&
        (!Number.isInteger(testimonial.rating) || testimonial.rating < 1 || testimonial.rating > 5)
    ) {
        errors.push({
            field: 'rating',
            message: 'Rating must be an integer between 1 and 5.'
        });
    }

    if (
        testimonial.display_order !== undefined &&
        (!Number.isInteger(testimonial.display_order) || testimonial.display_order < 0)
    ) {
        errors.push({
            field: 'display_order',
            message: 'Display order must be zero or a positive integer.'
        });
    }

    if (
        testimonial.is_active !== undefined &&
        typeof testimonial.is_active !== 'boolean'
    ) {
        errors.push({
            field: 'is_active',
            message: 'Active status must be true or false.'
        });
    }

    if (errors.length > 0) {
        return next(new AppError('Testimonial validation failed.', 400, errors));
    }

    testimonial.customer_name = testimonial.customer_name.trim();
    testimonial.message = testimonial.message.trim();

    if (typeof testimonial.customer_role === 'string') {
        testimonial.customer_role = testimonial.customer_role.trim();
    }

    if (typeof testimonial.image_url === 'string') {
        testimonial.image_url = testimonial.image_url.trim();
    }

    req.body = testimonial;
    next();
};

const validateTestimonialUpdate  = ( req, res , next )=>{
        const testimonial = cleanBody(req.body);
        const errors = [];

        // if()

}

module.exports = {
    validateTestimonial
};