const supabase = require('../config/supabase');

exports.getServices = async ( req, res, next) => {
    try {

    const { data, error } = await supabase.from('services').select('*').neq('is_active', false);
    
    return res.status(200).json({ 
        success:true , 
        data: data
     });

    } catch(err){


    if (error) {
        next(error);
    }
    }

};