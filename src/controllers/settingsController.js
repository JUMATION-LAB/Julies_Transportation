const settingsService = require('../services/settingsService');
const { asyncHandler } = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const getSettings = asyncHandler(async (req, res) => {
    const settings = await settingsService.getSettings();
    return successResponse(res, 200, 'Settings retrieved successfully.', settings);
});

const updateSettings = asyncHandler(async (req, res) => {
    const settings = await settingsService.updateSettings(req.params.id, req.body);
    return successResponse(res, 200, 'Settings updated successfully.', settings);
});

module.exports = {
    getSettings,
    updateSettings
};