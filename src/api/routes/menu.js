const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu')

router.get('/', menuController.read);
router.get('/:title', menuController.readOne);
router.post('/', menuController.create);

module.exports = router;