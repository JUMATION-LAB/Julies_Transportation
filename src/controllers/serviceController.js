const servicesService = require('../services/servicesService');
const { asyncHandler } = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const getServices = asyncHandler(async (req, res) => {
    const services = await servicesService.getServices();
    return successResponse(res, 200, 'Services retrieved successfully.', services);
});

const getService = asyncHandler(async (req, res) => {
    const service = await servicesService.getService(req.params.id);
    return successResponse(res, 200, 'Service retrieved successfully.', service);
});

const createService = asyncHandler(async (req, res) => {
    const service = await servicesService.createService(req.body);
    return successResponse(res, 201, 'Service created successfully.', service);
});

const updateService = asyncHandler(async (req, res) => {
    const service = await servicesService.updateService(req.params.id, req.body);
    return successResponse(res, 200, 'Service updated successfully.', service);
});

const deleteService = asyncHandler(async (req, res) => {
    const service = await servicesService.deleteService(req.params.id);
    return successResponse(res, 200, 'Service deleted successfully.', service);
});

module.exports = {
    getServices,
    getService,
    createService,
    updateService,
    deleteService
};






//TODO: It should catch errors.
/* const service = require('../services/servicesService');



exports.getService = async (req, res)=>{
    const services = await service.getServices();
    console.log(services);
 
    res.send(services);
}
 */

