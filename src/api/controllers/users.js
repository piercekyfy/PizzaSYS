const bcrypt = require('bcrypt');

const User = require('../models/User');

usersController = {
    create: async function(req, res) {
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        function regError(error, offendingField){
            res.redirect(`/register?error=${error}?offending=${offendingField}`);
        }

        const existing = await User.findOne({email: req.body.email}).exec();

        if(existing) {
            regError("Account with this E-Mail already exists", "email");
            return;
        }

        const user = new User({name: req.body.name, email: req.body.email, password: hashedPass, phone: req.body.phone, address: req.body.address, eircode: req.body.postcode});
        user.save().then(newUser => {
            // Login here
            res.redirect('/');
        }, error => {
            regError();
        });
    }
}

module.exports = usersController;