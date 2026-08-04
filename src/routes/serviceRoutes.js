const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/serviceController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateService,  validateServiceUpdate } = require('../middleware/validateService');
const { authenticate } = require('../middleware/authenticate');

router.get('/services', serviceController.getServices);
router.get('/services/:id', validateUUID, serviceController.getService);
router.post('/services', authenticate, validateService, serviceController.createService);
router.patch('/services/:id',authenticate, validateUUID, validateServiceUpdate, serviceController.updateService);
router.delete('/services/:id', authenticate, validateUUID, serviceController.deleteService);

module.exports = router;