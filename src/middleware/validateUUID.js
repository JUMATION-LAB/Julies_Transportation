// a725c0e8-08d2-45af-bda6-d88f759363ec
// This stops invalid IDs before Supabase receives them.

const { AppError } = require('../utils/AppError');

const validateUUID = (req, res, next) => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidPattern.test(req.params.id)) {
        return next(new AppError('Invalid vehicle ID.', 400));
    }

    next();
};



module.exports = {
    validateUUID
};

