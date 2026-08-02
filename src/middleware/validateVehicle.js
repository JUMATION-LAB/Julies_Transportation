const { AppError } = require('../utils/AppError');

const allowedFields = [
    'name',
    'description',
    'image_url',
    'passenger_capacity',
    'luggage_capacity',
    'vehicle_type',
    'is_available',
    'is_active',
    'display_order'
];

const removeUnknownFields = (body) => {
    return Object.fromEntries(
        Object.entries(body).filter(([field]) => allowedFields.includes(field))
    );
};

const validateVehicle = (req, res, next) => {
    const vehicle = removeUnknownFields(req.body);
    const errors = [];

    if (!vehicle.name || typeof vehicle.name !== 'string' || !vehicle.name.trim()) {
        errors.push({
            field: 'name',
            message: 'Vehicle name is required.'
        });
    }

    if (
        vehicle.passenger_capacity !== undefined &&
        vehicle.passenger_capacity !== null &&
        (!Number.isInteger(vehicle.passenger_capacity) || vehicle.passenger_capacity < 1)
    ) {
        errors.push({
            field: 'passenger_capacity',
            message: 'Passenger capacity must be a positive integer.'
        });
    }

    if (
        vehicle.display_order !== undefined &&
        (!Number.isInteger(vehicle.display_order) || vehicle.display_order < 0)
    ) {
        errors.push({
            field: 'display_order',
            message: 'Display order must be zero or a positive integer.'
        });
    }

    if (
        vehicle.is_available !== undefined &&
        typeof vehicle.is_available !== 'boolean'
    ) {
        errors.push({
            field: 'is_available',
            message: 'Availability must be true or false.'
        });
    }

    if (
        vehicle.is_active !== undefined &&
        typeof vehicle.is_active !== 'boolean'
    ) {
        errors.push({
            field: 'is_active',
            message: 'Active status must be true or false.'
        });
    }

    if (errors.length > 0) {
        return next(new AppError('Vehicle validation failed.', 400, errors));
    }

    vehicle.name = vehicle.name.trim();
    req.body = vehicle;

    next();
};

const validateVehicleUpdate = (req, res, next) => {
    const vehicle = removeUnknownFields(req.body);
    const errors = [];

    if (Object.keys(vehicle).length === 0) {
        return next(new AppError('Provide at least one vehicle field to update.', 400));
    }

    if (
        vehicle.name !== undefined &&
        (typeof vehicle.name !== 'string' || !vehicle.name.trim())
    ) {
        errors.push({
            field: 'name',
            message: 'Vehicle name cannot be empty.'
        });
    }

    if (
        vehicle.passenger_capacity !== undefined &&
        vehicle.passenger_capacity !== null &&
        (!Number.isInteger(vehicle.passenger_capacity) || vehicle.passenger_capacity < 1)
    ) {
        errors.push({
            field: 'passenger_capacity',
            message: 'Passenger capacity must be a positive integer.'
        });
    }

    if (
        vehicle.display_order !== undefined &&
        (!Number.isInteger(vehicle.display_order) || vehicle.display_order < 0)
    ) {
        errors.push({
            field: 'display_order',
            message: 'Display order must be zero or a positive integer.'
        });
    }

    if (
        vehicle.is_available !== undefined &&
        typeof vehicle.is_available !== 'boolean'
    ) {
        errors.push({
            field: 'is_available',
            message: 'Availability must be true or false.'
        });
    }

    if (
        vehicle.is_active !== undefined &&
        typeof vehicle.is_active !== 'boolean'
    ) {
        errors.push({
            field: 'is_active',
            message: 'Active status must be true or false.'
        });
    }

    //Stop the normal request flow and jump to the global error middleware. skipping the controllers.
    if (errors.length > 0) {
        return next(new AppError('Vehicle validation failed.', 400, errors));
    }

    if (vehicle.name !== undefined) {
        vehicle.name = vehicle.name.trim();
    }

    req.body = vehicle; 

    /// Validation passed. Move to the next middleware or controller.
    next();
};


module.exports = {
    validateVehicle,
    validateVehicleUpdate
};