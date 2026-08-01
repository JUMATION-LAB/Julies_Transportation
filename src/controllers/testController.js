const supabase = require('../config/supabase');


exports.connectionTest = async (req , res)=>{
res.json({
    success: true,
    message : "Supabase Connection successful."
});

};


