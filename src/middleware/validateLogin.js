const { AppError } = require('../utils/AppError');

console.log("Req headers");
const validateLogin = (req, res, next) => {
    const { body} = req.body;
    const { email, password } = body;
    console.log("Req body",req.body.body);
    console.log("Req body",  email , password);
    const errors = [];

    if (typeof email !== 'string' || !email.trim()) {
        errors.push({
            field: 'email',
            message: 'Email is required.'
        });
    }

    if (typeof password !== 'string' || !password) {
        errors.push({
            field: 'password',
            message: 'Password is required.'
        });
    }

    if (errors.length > 0) {
        return next(new AppError('Login validation failed.', 400, errors));
    }

    req.body = {
        email: email.trim().toLowerCase(),
        password
    };

    next();
};

module.exports = {
    validateLogin
};
