const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.get('/me', userController.read);
router.post('/', userController.create);

module.exports = router;