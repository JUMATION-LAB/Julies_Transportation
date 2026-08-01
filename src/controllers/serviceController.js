const service = require('../services/servicesService');

exports.getServices = async (req, res) => {

    try {
        const services = await service.getServices();

        return res.status(200).json({
            success: true,
            data: services
        });
        
    } catch (error) {
        console.error('Failed to retrieve services:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve services.'
        });
    }
};









//TODO: It should catch errors.
/* const service = require('../services/servicesService');



exports.getService = async (req, res)=>{
    const services = await service.getServices();
    console.log(services);
 
    res.send(services);
}
 */

 