const bcrypt = require('bcrypt');

const User = require('../models/User.js');

loginController = {
    get: function(req,res) {
        res.render('login');
    },
    post: async function(req, res) {
        const existing = await User.findOne({email: req.body.email}).exec();

        function regError(error, offendingField){
            res.redirect(`${req.baseUrl}?error=${error}?offending=${offendingField}`);
        }

        if(!existing) {
            regError("Wrong E-mail/Password", "email");
            return;
        }

        const correct = await bcrypt.compare(req.body.password, existing.password);

        if(correct) {
            // Login here
            req.redirect('/');
        } else {
            regError("Wrong E-mail/Password", "email")
        }
    }
}

module.exports = loginController;