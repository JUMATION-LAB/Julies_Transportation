const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/serviceController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateService,  validateServiceUpdate } = require('../middleware/validateService');

router.get('/services', serviceController.getServices);
router.get('/services/:id', validateUUID, serviceController.getService);
router.post('/services', validateService, serviceController.createService);
router.patch('/services/:id', validateUUID, validateServiceUpdate, serviceController.updateService);
router.delete('/services/:id', validateUUID, serviceController.deleteService);

module.exports = router;