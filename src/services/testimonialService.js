const supabase = require('../config/supabase');
const { AppError } = require('../utils/AppError');

const getTestimonials = async () => {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};

const getTestimonial = async (id) => {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Testimonial not found.', 404);
    }

    return data;
};

const createTestimonial = async (testimonialData) => {
    const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonialData)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};

const updateTestimonial = async (id, testimonialData) => {
    const { data, error } = await supabase
        .from('testimonials')
        .update({
            ...testimonialData,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('is_active', true)
        .select()
        .maybeSingle();
        // console.log(data)

    if (error) {
        throw error;
    }

    if (!data) {
        throw new AppError('Testimonial not found.', 404);
    }

    return data;
};

const deleteTestimonial = async (id) => {
    const { data, error } = await supabase
        .from('testimonials')
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
        throw new AppError('Testimonial not found.', 404);
    }

    return data;
};

module.exports = {
    getTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};