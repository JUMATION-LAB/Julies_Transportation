const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const config = require('../config/appConfig');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Authentication required.', 401);
    }

    const token = authHeader.slice(7);

    let decoded;

    try {
        decoded = jwt.verify(token, config.jwt.secret, {
            algorithms: ['HS256']
        });
    } catch {
        throw new AppError('Invalid or expired token.', 401);
    }

    if (!decoded.adminId) {
        throw new AppError('Invalid authentication token.', 401);
    }
//This returns the payload of the token, which is the adminId and email.
//e.g { adminId: 1, email: 'admin@example.com' }


        //This attaches the decoded payload to the request object, so that it can be accessed in subsequent middleware or route handlers.
         // .user will now contain the decoded payload of the token, which is the adminId and email. 
        // say if you want to access the adminId, you can do req.user.adminId. 
       
    const { data: admin, error } = await supabase
        .from('admins')
        .select('id, name, email, is_active')
        .eq('id', decoded.adminId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!admin || !admin.is_active) {
        throw new AppError('Administrator access is no longer active.', 401);
    }

    req.user = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'admin'
    };

    next();
});

module.exports = { authenticate };