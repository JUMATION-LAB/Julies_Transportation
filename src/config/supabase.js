const { createClient } = require('@supabase/supabase-js');
const config = require('./appConfig');

const supabase = createClient( 

    config.supabase.url , //That's called abstraction.

    config.supabase.annonKey 

    );


module.exports = supabase;
