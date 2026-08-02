const vehicleService = require('../services/vehicleService');
const { asyncHandler } = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const getVehicles = asyncHandler(async (req, res) => {
    const vehicles = await vehicleService.getVehicles();

    return successResponse(
        res,
        200,
        'Vehicles retrieved successfully.',
        vehicles
    );
});

const getVehicle = asyncHandler(async (req, res) => {
    const vehicle = await vehicleService.getVehicle(req.params.id);

    return successResponse(
        res,
        200,
        'Vehicle retrieved successfully.',
        vehicle
    );
});

const createVehicle = asyncHandler(async (req, res) => {
    const vehicle = await vehicleService.createVehicle(req.body);

    return successResponse(
        res,
        201,
        'Vehicle created successfully.',
        vehicle
    );
});

const updateVehicle =  asyncHandler( async (req, res )=>{
    const updatedVehicle = await vehicleService.updateVehicle(req.params.id , req.body);
// console.log(req.params.id + ":::" , req.body);

    return successResponse(
        res,
        201,
        'Vehicle updated successfuly',
        updatedVehicle
    );
});





const deleteVehicle = asyncHandler(async (req, res) => {
    const vehicle = await vehicleService.deleteVehicle(req.params.id);

    return successResponse(
        res,
        200,
        'Vehicle deleted successfully.',
        vehicle
    );
});

module.exports = {
    getVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
};