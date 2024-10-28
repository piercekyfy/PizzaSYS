const bcrypt = require('bcrypt');

const User = require('../models/User.js');


registerController = {
    get: function(req,res) {
        res.render('register');
    },
    post: function(req, res) {
        
    }
}

module.exports = registerController;