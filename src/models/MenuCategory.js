const mongoose = require('mongoose');

const MenuItem = new mongoose.Schema({
    title: String,
    price: Number,
    ingredientDesc: String,
    desc: String
});

const menuCategory = new mongoose.Schema({
    title: String,
    MenuItems: [MenuItem]
});

module.exports = mongoose.model('MenuCategory', menuCategory);