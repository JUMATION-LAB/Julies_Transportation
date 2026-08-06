const { createClient } = require('@supabase/supabase-js');
const config = require('./appConfig');

const supabase = createClient(

    config.supabase.url, //That's called abstraction.

    config.supabase.secretKey
    ,
    {
        auth: {
            persistSession: false, //This prevents the client from storing the session in local storage, which is important for server-side applications.
            autoRefreshToken: false, //this allows you to control when and how tokens are refreshed, which is important for server-side applications where you might want to handle token refreshes manually.
            detectSessionInUrle: false //Detecting sessions in the URL is typically a client-side concern, and disabling it can help prevent potential security issues in server-side applications.
        }
    }

);

// /Supabase recommends a separate
//  server-side client for administrative operations.

module.exports = supabase;
