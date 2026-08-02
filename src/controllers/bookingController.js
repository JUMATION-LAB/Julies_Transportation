const bookingService = require('../services/bookingService');
const { asyncHandler } = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');


const createBooking = asyncHandler(async (req, res) => {
    const booking = await bookingService.createBooking(req.body);
    return successResponse(
        res,
        201,
        'Booking created successfully.',
        booking
    );
});


const getBookings = asyncHandler(async (req, res) => {
    const bookings = await bookingService.getBookings();
    return successResponse(
        res,
        200,
        'Bookings retrieved successfully.',
        bookings
    );
});



const getBooking = asyncHandler(async (req, res) => {
    const booking = await bookingService.getBooking(req.params.id);
    return successResponse(
        res,
        200,
        'Booking retrieved successfully.',
        booking
    );
});


const updateBookingStatus = asyncHandler(async (req, res) => {
    const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
    return successResponse(
        res,
        200,
        'Booking status updated successfully.',
        booking
    );
});



module.exports = {
    createBooking,
    getBookings,
    getBooking,
    updateBookingStatus
};

