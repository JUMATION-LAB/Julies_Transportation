const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateBooking, validateBookingStatus } = require('../middleware/validateBooking');
const { authorize } = require('../middleware/authorize');

router.post('/bookings', validateBooking, bookingController.createBooking);
router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:id', validateUUID,authorize('admin'), bookingController.getBooking);
router.patch('/bookings/:id/status', validateUUID, authorize('admin'),validateBookingStatus, bookingController.updateBookingStatus);

module.exports = router;