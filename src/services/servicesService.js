const supabase = require('../config/supabase');
const { AppError } = require('../utils/AppError');

const getServices = async () => {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};

const getService = async (id) => {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Service not found.', 404);
    }

    return data;
};

const createService = async (serviceData) => {
    const { data, error } = await supabase
        .from('services')
        .insert(serviceData)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

const updateService = async (id, serviceData) => {
    const { data, error } = await supabase
        .from('services')
        .update({
            ...serviceData,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('is_active', true)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Service not found.', 404);
    }

    return data;
};

const deleteService = async (id) => {
    const { data, error } = await supabase
        .from('services')
        .update({
            is_active: false,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('is_active', true)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Service not found.', 404);
    }

    return data;
};

module.exports = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService
};