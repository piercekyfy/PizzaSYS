const express = require('express');
const router = express.Router();
const passport = require('passport')

const loginController = require('../controllers/login.js');

router.get('/', loginController.render)
router.post('/auth', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}))

module.exports = router;