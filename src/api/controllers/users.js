const bcrypt = require('bcrypt');

const User = require('../models/User');

usersController = {
    read: async function(req, res) {
        if(req.user === undefined){
            return res.status(403).json({  error: "Forbidden"});
        } 
        const user = await User.findOne({email: req.user.email});

        return res.status(200).json(user);

    },
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
            req.login(newUser, (err) => {
                res.redirect('/')
            })
            
        }, error => {
            regError();
        });
    }
}

module.exports = usersController;