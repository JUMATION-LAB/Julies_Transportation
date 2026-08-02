const config = {


    port: process.env.PORT || 3000,


    supabase: {

        url: process.env.SUPABASE_URL,

        annonKey: process.env.SUPABASE_ANON_KEY

    }

}

module.exports = config;
