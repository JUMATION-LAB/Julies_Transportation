const supabase = require('../config/supabase');
const { AppError } = require('../utils/AppError');

const getVehicles = async () => {
    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
    console.log(data);

    if (error) {
        throw error;
    }

    return data;
};



const getVehicle = async (id) => {
    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();
    console.log(data);


    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Vehicle not found.', 404);
    }

    return data;
};



const createVehicle = async (vehicleData) => {
    const { data, error } = await supabase
        .from('vehicles')
        .insert(vehicleData)
        .select()
        .single();
    console.log(data);

    if (error) {
        throw error;
    }

    return data;
};

const updateVehicle = async (id, vehicleData) => {
    
    const updateData = {
        ...vehicleData,
        updated_at: new Date().toISOString()
    };
    console.log(updateData);


    const { data, error } = await supabase
        .from('vehicles')
        .update(updateData)
        .eq('id', id)
        .eq('is_active', true)
        .select()
        .maybeSingle();
    console.log(data);

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Vehicle not found.', 404);
    }

    return data;
};

const deleteVehicle = async (id) => {
    const { data, error } = await supabase
        .from('vehicles')
        .update({
            is_active: false,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('is_active', true)
        .select()
        .maybeSingle();
    console.log(data);

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Vehicle not found.', 404);
    }

    return data;
};

module.exports = {
    getVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
};


/* 
Imports
↓
getAll
↓
getById
↓
create
↓
update
↓
remove
↓
module.exp */






