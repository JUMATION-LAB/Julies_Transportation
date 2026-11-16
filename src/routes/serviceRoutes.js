const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/serviceController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateService,  validateServiceUpdate } = require('../middleware/validateService');
const { authorize } = require('../middleware/authorize');

router.get('/services', serviceController.getServices);
router.get('/services/:id', validateUUID, serviceController.getService);
router.post('/services', authorize('admin'),validateService, serviceController.createService);
router.patch('/services/:id', validateUUID,authorize('admin'),  validateServiceUpdate, serviceController.updateService);
router.delete('/services/:id', validateUUID, authorize('admin'), serviceController.deleteService);

module.exports = router;