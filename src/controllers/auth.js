authController = {
    getRegister: function(req,res) {
    
        res.render('register');
    },
    getLogin: function(req,res) {
    
        res.render('login');
    },
}

module.exports = authController;