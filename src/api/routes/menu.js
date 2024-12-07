const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu')

router.get('/', menuController.read);
router.get('/:title', menuController.readOne);
router.post('/', menuController.create);
router.post('/:title', menuController.createOne);
router.delete('/:title', menuController.delete);
module.exports = router;