const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register.js');

router.get('/', registerController.get)
router.post('/', registerController.post)

module.exports = router;