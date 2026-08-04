
const config = {


    port: process.env.PORT || 3000,


    supabase: {

        url: process.env.SUPABASE_URL,

        // annonKey: process.env.SUPABASE_ANON_KEY,

        secretKey: process.env.SUPABASE_SECRET_KEY

    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'

    }

}

module.exports = config;
