const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    eircode: String
});

module.exports = mongoose.model('User', user);