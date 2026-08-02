const supabase = require('../config/supabase');


exports.getServices = async () => {
    
        const { data, error } = await supabase.from('services').select('*').neq('is_active', false);

        console.log("   Data: ", data);

          if (error) {
            return error;
        }

        return {
            success: true,
            data: data
        };
 
};
