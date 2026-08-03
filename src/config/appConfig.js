const config = {


    port: process.env.PORT || 3000,


    supabase: {

        url: process.env.SUPABASE_URL,

        // annonKey: process.env.SUPABASE_ANON_KEY,

        secretKey: process.env.SUPABASE_SECRET_KEY

    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'

    }

}

module.exports = config;
