const { AppError } = require('../utils/AppError');

const allowedFields = [
    'title',
    'description',
    'image_url',
    'is_active',
    'display_order'
];

const cleanBody = (body) => {
    return Object.fromEntries(Object.entries(body).filter(([field]) => allowedFields.includes(field)));
};

const validateGallery = (req, res, next) => {
    const gallery = cleanBody(req.body);
    const errors = [];

    if (typeof gallery.image_url !== 'string' || !gallery.image_url.trim()) {
        errors.push({
            field: 'image_url',
            message: 'Image URL is required.'
        });
    }

    ['title', 'description'].forEach((field) => {
        if (
            gallery[field] !== undefined &&
            gallery[field] !== null &&
            typeof gallery[field] !== 'string'
        ) {
            errors.push({
                field,
                message: `${field} must be a string or null.`
            });
        }
    });

    if (
        gallery.is_active !== undefined &&
        typeof gallery.is_active !== 'boolean'
    ) {
        errors.push({
            field: 'is_active',
            message: 'Active status must be true or false.'
        });
    }

    if (
        gallery.display_order !== undefined &&
        (!Number.isInteger(gallery.display_order) || gallery.display_order < 0)
    ) {
        errors.push({
            field: 'display_order',
            message: 'Display order must be zero or a positive integer.'
        });
    }

    if (errors.length > 0) {
        return next(new AppError('Gallery validation failed.', 400, errors));
    }

    Object.keys(gallery).forEach((field) => {
        if (typeof gallery[field] === 'string') {
            gallery[field] = gallery[field].trim();
        }
    });

    req.body = gallery;
    next();
};

const validateGalleryUpdate = (req, res, next) => {
    const gallery = cleanBody(req.body);
    const errors = [];

    if (Object.keys(gallery).length === 0) {
        return next(new AppError('Provide at least one gallery field to update.', 400));
    }

    if (
        gallery.image_url !== undefined &&
        (typeof gallery.image_url !== 'string' || !gallery.image_url.trim())
    ) {
        errors.push({
            field: 'image_url',
            message: 'Image URL cannot be empty.'
        });
    }

    ['title', 'description'].forEach((field) => {
        if (
            gallery[field] !== undefined &&
            gallery[field] !== null &&
            typeof gallery[field] !== 'string'
        ) {
            errors.push({
                field,
                message: `${field} must be a string or null.`
            });
        }
    });

    if (
        gallery.is_active !== undefined &&
        typeof gallery.is_active !== 'boolean'
    ) {
        errors.push({
            field: 'is_active',
            message: 'Active status must be true or false.'
        });
    }

    if (
        gallery.display_order !== undefined &&
        (!Number.isInteger(gallery.display_order) || gallery.display_order < 0)
    ) {
        errors.push({
            field: 'display_order',
            message: 'Display order must be zero or a positive integer.'
        });
    }

    if (errors.length > 0) {
        return next(new AppError('Gallery validation failed.', 400, errors));
    }

    Object.keys(gallery).forEach((field) => {
        if (typeof gallery[field] === 'string') {
            gallery[field] = gallery[field].trim();
        }
    });

    req.body = gallery;
    next();
};

module.exports = {
    validateGallery,
    validateGalleryUpdate
};