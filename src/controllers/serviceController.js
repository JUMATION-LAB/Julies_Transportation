const service = require('../services/servicesService');
const { succesResponse } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');


exports.getServices = asyncHandler(async (req, res) => {

    const services = await service.getServices();
    console.log("Services: ", services);

    return succesResponse(
        res,
        200,
        'Serviced retrieved successfully',
        services
    );

});









//TODO: It should catch errors.
/* const service = require('../services/servicesService');



exports.getService = async (req, res)=>{
    const services = await service.getServices();
    console.log(services);
 
    res.send(services);
}
 */

