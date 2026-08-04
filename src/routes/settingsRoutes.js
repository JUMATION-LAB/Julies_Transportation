const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settingsController');
const { validateUUID } = require('../middleware/validateUUID');
const { validateSettingsUpdate } = require('../middleware/validateSettings');
const { authenticate } = require('../middleware/authenticate');

router.get('/settings', authenticate, settingsController.getSettings);
router.patch('/settings/:id', authenticate,  validateUUID, validateSettingsUpdate, settingsController.updateSettings);

module.exports = router;