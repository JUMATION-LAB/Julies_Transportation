const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateBooking, validateBookingStatus } = require('../middleware/validateBooking');

router.post('/bookings', validateBooking, bookingController.createBooking);
router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:id', validateUUID, bookingController.getBooking);
router.patch('/bookings/:id/status', validateUUID, validateBookingStatus, bookingController.updateBookingStatus);

module.exports = router;