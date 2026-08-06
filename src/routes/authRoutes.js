const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { validateLogin } = require('../middleware/validateLogin');

router.post('/auth/login', validateLogin, authController.login);

module.exports = router;


