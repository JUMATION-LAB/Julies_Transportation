const express = require('express');
const path = require('path');

const router = express.Router();
const pageController = require('../controllers/pageController');


router.get('/' , pageController.home);
console.log('calledd')
module.exports = router;
