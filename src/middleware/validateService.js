const { AppError } = require('../utils/AppError');

const allowedFields = [
    'name',
    'description',
    'icon',
    'is_active',
    'display_order'
];

const cleanBody = (body) => {
    return Object.fromEntries(
        Object.entries(body).filter(([field]) => allowedFields.includes(field))
    );
};

const validateService = (req, res, next) => {
    const service = cleanBody(req.body);
    const errors = [];

    if (!service.name || typeof service.name !== 'string' || !service.name.trim()) {
        errors.push({
            field: 'name',
            message: 'Service name is required.'
        });
    }

    if (
        service.display_order !== undefined &&
        (!Number.isInteger(service.display_order) || service.display_order < 0)
    ) {
        errors.push({
            field: 'display_order',
            message: 'Display order must be zero or a positive integer.'
        });
    }

    if (
        service.is_active !== undefined &&
        typeof service.is_active !== 'boolean'
    ) {
        errors.push({
            field: 'is_active',
            message: 'Active status must be true or false.'
        });
    }

    if (errors.length > 0) {
        return next(new AppError('Service validation failed.', 400, errors));
    }

    service.name = service.name.trim();
    req.body = service;

    next();
};

const validateServiceUpdate = (req, res, next) => {
    const service = cleanBody(req.body);
    const errors = [];

    if (Object.keys(service).length === 0) {
        return next(new AppError('Provide at least one service field to update.', 400));
    }

    if (
        service.name !== undefined &&
        (typeof service.name !== 'string' || !service.name.trim())
    ) {
        errors.push({
            field: 'name',
            message: 'Service name cannot be empty.'
        });
    }

    if (
        service.display_order !== undefined &&
        (!Number.isInteger(service.display_order) || service.display_order < 0)
    ) {
        errors.push({
            field: 'display_order',
            message: 'Display order must be zero or a positive integer.'
        });
    }

    if (
        service.is_active !== undefined &&
        typeof service.is_active !== 'boolean'
    ) {
        errors.push({
            field: 'is_active',
            message: 'Active status must be true or false.'
        });
    }

    if (errors.length > 0) {
        return next(new AppError('Service validation failed.', 400, errors));
    }

    if (service.name !== undefined) {
        service.name = service.name.trim();
    }

    req.body = service;

    next();
};

module.exports = {
    validateService,
    validateServiceUpdate
};