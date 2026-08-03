const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicleController');
const { validateUUID } = require('../middleware/validateUUID');
const {validateVehicle, validateVehicleUpdate } = require('../middleware/validateVehicle');
const { authenticate } = require('../middleware/authenticate');

router.get('/vehicles', authenticate, vehicleController.getVehicles);

router.get( '/vehicles/:id', validateUUID, vehicleController.getVehicle );

router.post( '/vehicles', validateVehicle, vehicleController.createVehicle );
    
router.patch( '/vehicles/:id', validateUUID, validateVehicleUpdate, vehicleController.updateVehicle );

router.delete( '/vehicles/:id', validateUUID, vehicleController.deleteVehicle );

module.exports = router;

