const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');
const { AppError } = require('../utils/AppError');


///This file asks whether the logged in user has a token.
const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new AppError('Authentication required.', 401));
    }

    if(!authHeader.startsWith('Bearer ')){
         new AppError('Invalid Authorization header', 401)
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError('Authentication token missing.', 401));
    }

    try {

        const decoded = jwt.verify(
            token,
            config.jwt.secret
        ); //This returns the payload of the token, which is the adminId and email.
//e.g { adminId: 1, email: 'admin@example.com' }


        //This attaches the decoded payload to the request object, so that it can be accessed in subsequent middleware or route handlers.
        req.user = decoded; // .user will now contain the decoded payload of the token, which is the adminId and email. 
        // say if you want to access the adminId, you can do req.user.adminId. 
        next();

    } catch {

        return next(new AppError('Invalid or expired token.', 401));

    }

};

module.exports = {
    authenticate
};