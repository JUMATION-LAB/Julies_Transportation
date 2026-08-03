const supabase = require('../config/supabase');
const { AppError } = require('../utils/AppError');

const getGalleryItems = async () => {
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};

const getGalleryItem = async (id) => {
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Gallery item not found.', 404);
    }

    return data;
};

const createGalleryItem = async (galleryData) => {
    const { data, error } = await supabase
        .from('gallery')
        .insert(galleryData)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

const updateGalleryItem = async (id, galleryData) => {
    const { data, error } = await supabase
        .from('gallery')
        .update({
            ...galleryData,
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
        throw new AppError('Gallery item not found.', 404);
    }

    return data;
};

const deleteGalleryItem = async (id) => {
    const { data, error } = await supabase
        .from('gallery')
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
        throw new AppError('Gallery item not found.', 404);
    }

    return data;
};

module.exports = {
    getGalleryItems,
    getGalleryItem,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
};