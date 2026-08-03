const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const config = require('../config/appConfig');
const { AppError } = require('../utils/AppError');

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

    const token = jwt.sign(
        {
            adminId: admin.id,
            email: admin.email
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn
        }
    );

    return {
        token,
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