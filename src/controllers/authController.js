const authService = require('../services/authService');
const { asyncHandler } = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const login = asyncHandler(async (req, res) => {
    const result = await authService.login(
        req.body.email,
        req.body.password
    );

    return successResponse(
        res,
        200,
        'Login successful.',
        result
    );
});


const logout = asyncHandler( async (req, res )=>{
    const logout = await authService.logout();

    return successResponse(
        res,
        200,
        'Logged out successfully.',
    )


});

module.exports = {
    login
};