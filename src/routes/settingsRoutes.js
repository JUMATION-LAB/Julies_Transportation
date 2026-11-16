const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settingsController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateSettingsUpdate } = require('../middleware/validateSettings');
const { authorize } = require('../middleware/authorize');

router.get('/settings', settingsController.getSettings);
router.patch('/settings/:id', validateUUID,authorize('admin'), validateSettingsUpdate, settingsController.updateSettings);

module.exports = router;