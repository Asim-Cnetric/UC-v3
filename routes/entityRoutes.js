const express = require('express');
const { entities } = require('../controllers/entityController');
const baseURL = require('../middleware/baseURLBuilder');

const router = express.Router();

router.get('/', baseURL,entities);

module.exports = router;