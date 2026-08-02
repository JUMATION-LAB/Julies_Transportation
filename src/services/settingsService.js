const supabase = require('../config/supabase');
const { AppError } = require('../utils/AppError');

const getSettings = async () => {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Business settings were not found.', 404);
    }

    return data;
};

const updateSettings = async (id, settingsData) => {
    const { data, error } = await supabase
        .from('settings')
        .update({
            ...settingsData,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Business settings were not found.', 404);
    }

    return data;
};

module.exports = {
    getSettings,
    updateSettings
};

