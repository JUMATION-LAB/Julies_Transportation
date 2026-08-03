const { AppError } = require('../utils/AppError');

const authorize = (...roles) => { /// JavaScript's rest parameter.

    return (req, res, next) => {

        if (!req.user) {
            return next(new AppError('Authentication required.',401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError('Access denied.', 403) );
        }

        next();

    };

};

module.exports = {
    authorize
};






/* 

This introduces something new

Look carefully.

const authorize = (...roles) => {

Notice

(...roles)

This is JavaScript's rest parameter.

If you call

authorize('admin')

then

roles

becomes

[
    "admin"
]

If you call

authorize(
    'admin',
    'driver'
)

then

roles

becomes

[
    "admin",
    "driver"
]

So our middleware can support one role or many roles without rewriting it.

Another new thing

Notice this:

return (req, res, next) => {

};

You may wonder:

Why is there a function inside another function?

Because middleware must eventually look like:

(req, res, next)

But we also want to pass configuration.

Think of it like this:

We first configure it:

authorize('admin')

That returns the actual middleware:

(req, res, next)

So the flow is:

authorize('admin')

↓

returns

↓

(req,res,next)

This pattern is called a middleware factory.

How Express sees it

Suppose we write

router.delete(

    '/vehicles/:id',

    authenticate,

    authorize('admin'),

    vehicleController.deleteVehicle

);

Express receives

*/