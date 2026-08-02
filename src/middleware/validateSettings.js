const { AppError } = require('../utils/AppError');

const allowedFields = [
    'business_name',
    'slogan',
    'description',
    'primary_phone',
    'secondary_phone',
    'whatsapp_number',
    'email',
    'address',
    'map_url',
    'logo_url',
    'hero_image_url',
    'facebook_url',
    'instagram_url',
    'tiktok_url',
    'business_hours'
];

const cleanBody = (body) => {
    return Object.fromEntries(Object.entries(body).filter(([field]) => allowedFields.includes(field)));
};

const validateSettingsUpdate = (req, res, next) => {
    const settings = cleanBody(req.body);
    const errors = [];

    if (Object.keys(settings).length === 0) {
        return next(new AppError('Provide at least one settings field to update.', 400));
    }

    if (settings.business_name !== undefined && (typeof settings.business_name !== 'string' || !settings.business_name.trim())) {
        errors.push({ field: 'business_name', message: 'Business name cannot be empty.' });
    }

    const optionalStringFields = [
        'slogan',
        'description',
        'primary_phone',
        'secondary_phone',
        'whatsapp_number',
        'email',
        'address',
        'map_url',
        'logo_url',
        'hero_image_url',
        'facebook_url',
        'instagram_url',
        'tiktok_url',
        'business_hours'
    ];

    optionalStringFields.forEach((field) => {
        const value = settings[field];

        if (value !== undefined && value !== null && typeof value !== 'string') {
            errors.push({ field, message: `${field} must be a string or null.` });
        }
    });

    if (settings.email !== undefined && settings.email !== null && typeof settings.email === 'string') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (settings.email.trim() && !emailPattern.test(settings.email.trim())) {
            errors.push({ field: 'email', message: 'Email address is invalid.' });
        }
    }

    if (errors.length > 0) {
        return next(new AppError('Settings validation failed.', 400, errors));
    }

    Object.keys(settings).forEach((field) => {
        if (typeof settings[field] === 'string') {
            settings[field] = settings[field].trim();
        }
    });

    req.body = settings;
    next();
};

module.exports = {
    validateSettingsUpdate
};