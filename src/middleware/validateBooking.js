const { AppError } = require('../utils/AppError');
/* 
Required string:
type check OR empty-after-trim check
Optional string:
if supplied and not null, confirm it is a string
Integer:
Number.isInteger plus range
Boolean:
typeof value === 'boolean'

 */
const allowedFields = [
    'customer_name',
    'phone',
    'email',
    'service_id',
    'vehicle_id',
    'pickup_location',
    'destination',
    'travel_date',
    'departure_time',
    'return_date',
    'passengers',
    'message'
];



const cleanBody = (body) => {
    return Object.fromEntries(
        Object.entries(body).filter(([field]) => allowedFields.includes(field))
    );
};

const validateBooking = (req, res, next) => {
    const booking = cleanBody(req.body);
    const errors = [];

    if (!booking.customer_name || typeof booking.customer_name !== 'string' || !booking.customer_name.trim()) {
        errors.push({ 
            field: 'customer_name',
            message: 'Customer name is required.'
        });
    }

    if (!booking.phone || typeof booking.phone !== 'string' || !booking.phone.trim()) {
        errors.push({ 
            field: 'phone',
            message: 'Phone number is required.'
        });
    }

    if (!booking.pickup_location || typeof booking.pickup_location !== 'string' || !booking.pickup_location.trim()) {
        errors.push({ 
            field: 'pickup_location',
            message: 'Pickup location is required.'
        });
    }

    if (!booking.destination || typeof booking.destination !== 'string' || !booking.destination.trim()) {
        errors.push({ 
            field: 'destination',
            message: 'Destination is required.'
        });
    }

    if (!booking.travel_date || Number.isNaN(Date.parse(booking.travel_date))) {
        errors.push({ 
            field: 'travel_date',
            message: 'A valid travel date is required.'
        });
    }

    if (!Number.isInteger(booking.passengers) || booking.passengers < 1) {
        errors.push({ 
            field: 'passengers',
            message: 'Passengers must be a positive integer.'
        });
    }


    if (booking.return_date && Number.isNaN(Date.parse(booking.return_date))) {
        errors.push({
            field: 'return_date',
            message: 'Return date must be valid.'
        });
    }


    if (booking.travel_date && booking.return_date) {
        const travelDate = new Date(booking.travel_date);
        const returnDate = new Date(booking.return_date);

        if (returnDate < travelDate) {
            errors.push({
                 field: 'return_date',
                 message: 'Return date cannot be before travel date.'
            });
        }
    }

    //reject past dates.
    if (booking.travel_date && !Number.isNaN(Date.parse(booking.travel_date))) {
    const travelDate = new Date(booking.travel_date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (travelDate < today) {
        errors.push({ 
            field: 'travel_date',
             message: 'Travel date cannot be in the past.' 
        });
    }
}

    if (booking.email !== undefined && booking.email !== null && typeof booking.email !== 'string') {
        errors.push({ 
            field: 'email',
            message: 'Email must be a string or null.'
        });
    }

    if (errors.length > 0) {
        return next(new AppError('Booking validation failed.', 400, errors));
    }

    booking.customer_name = booking.customer_name.trim();
    booking.phone = booking.phone.trim();
    booking.pickup_location = booking.pickup_location.trim();
    booking.destination = booking.destination.trim();

    req.body = booking;
    next();
};

const validateBookingStatus = (req, res, next) => {
    const allowedStatuses = ['pending', 'contacted', 'confirmed', 'completed', 'cancelled'];
    const { status } = req.body;

    if (!status || !allowedStatuses.includes(status)) {
        return next(new AppError('Invalid booking status.', 400, [
            {
                field: 'status',
                message: `Status must be one of: ${allowedStatuses.join(', ')}.`
            }
        ]));
    }

    req.body = { status };
    next();
};

module.exports = {
    validateBooking,
    validateBookingStatus
};