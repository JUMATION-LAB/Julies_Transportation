const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const config = require('../config/appConfig');
const { AppError } = require('../utils/AppError');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

const login = async (email, password) => {
    const { data: admin, error } = await supabase
        .from('admins')
        .select('id, name, email, password_hash, is_active')
        .eq('email', email)
        .maybeSingle();
console.log("Admin data:", admin);
    if (error) {
        throw error;
    }

    if (!admin || !admin.is_active) {
        throw new AppError('Invalid email or password.', 401);
    }

    const passwordMatches = await bcrypt.compare(
        password,
        admin.password_hash
    );

    if (!passwordMatches) {
        throw new AppError('Invalid email or password.', 401);
    }

    // 4. Calculate absolute expiration date (30 days from now) for PostgreSQL timestamptz
    // const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);



    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);
    // Optionally, you can store the refresh token in the database 
    // or a secure storage for later use.

    return {
        accessToken,
        admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email
        }
    };
};

module.exports = {
    login
};