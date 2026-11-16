const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicleController');

const { validateUUID } = require('../middleware/validateUUID');
const {validateVehicle, validateVehicleUpdate } = require('../middleware/validateVehicle');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

router.get('/vehicles', authenticate, vehicleController.getVehicles);

router.get( '/vehicles/:id', validateUUID, vehicleController.getVehicle );

router.post( '/vehicles', validateVehicle, authorize('admin'), vehicleController.createVehicle );
    
router.patch( '/vehicles/:id', validateUUID, authorize('admin'), validateVehicleUpdate, vehicleController.updateVehicle );

router.delete( '/vehicles/:id', validateUUID, authorize('admin'),  vehicleController.deleteVehicle );

module.exports = router;

