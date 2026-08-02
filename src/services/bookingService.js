const supabase = require('../config/supabase');
const { AppError } = require('../utils/AppError');
const { generateBookingReference } = require('../utils/generateBookingReference');

const checkServiceExists = async (serviceId) => {
    
    if (!serviceId) {
        return;
    }

    const { data, error } = await supabase.
    from('services').select('id')
    .eq('id', serviceId).eq('is_active', true).maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Selected service was not found.', 404);
    }
};



const checkVehicleExists = async (vehicleId) => {
    if (!vehicleId) {
        return;
    }

    const { data, error } = await 
        supabase.from('vehicles')
        .select('id, is_available')
        .eq('id', vehicleId)
        .eq('is_active', true).maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Selected vehicle was not found.', 404);
    }

    if (!data.is_available) {
        throw new AppError('Selected vehicle is currently unavailable.', 409);
    }
};



const createBooking = async (bookingData) => { 
    // Promise.all() runs them at the same time instead of 
    // waiting for one before starting the other.
    await Promise.all([
        checkServiceExists(bookingData.service_id),
        checkVehicleExists(bookingData.vehicle_id)
    ]);

    const bookingReference = generateBookingReference();

    const { data, error } = await supabase
        .from('bookings')
        .insert({
             ...bookingData,
            booking_reference: bookingReference
        })
        .select(`*, services(id, name ), vehicles( id, name, passenger_capacity )`).single();

    if (error) {
        throw error;
    }

    return data;
};

const getBookings = async () => {
    const { data, error } = await supabase
        .from('bookings')
        .select(`*,services (id, name), vehicles(id, name, passenger_capacity)`)
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    return data;
};

const getBooking = async (id) => {
    const { data, error } = await supabase
        .from('bookings')
        .select(`*,services( id,name),vehicles(id,name,passenger_capacity)`)
        .eq('id', id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Booking not found.', 404);
    }

    return data;
};

const updateBookingStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('bookings')
        .update({
            status,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Booking not found.', 404);
    }

    return data;
};

module.exports = {
    createBooking,
    getBookings,
    getBooking,
    updateBookingStatus
};