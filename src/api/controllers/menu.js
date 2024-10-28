const MenuCategory = require('../models/MenuCategory');

menuController = {
    read: function(req, res) {
        MenuCategory.find({}).exec().then(result => {
            res.status(200).json(result);
        }, err => {
            res.status(500).json({error: "Failed to retrieve file."});
        })
    },
    readOne: function(req, res) {
        MenuCategory.findOne({title: req.params.title}).exec().then(result => {
            if(result)
                res.status(200).json(result);
            else
                res.status(404).json(result);
        }, err => {
            res.status(500).json({error: "Failed to retrieve file."});
        });
    },
    create: async function(req, res) {
        if(await MenuCategory.findOne({"title" : { $regex : req.body.title, $options: "i" }})) 
            return res.status(400).json({"error": "Category already exists."});

        const menuItems = [];
        let id = 0;
        req.body.menuItems.forEach(menuItem => {
            const newMenuItem = { title: menuItem.title, price: menuItem.price, ingredientDesc: menuItem.ingredientDesc, desc: menuItem.desc };
            menuItems.push(newMenuItem);
            id += 1;
        })

        const newCategory = new MenuCategory({ title: req.body.title, menuItems: menuItems });
        newCategory.save().then(newCategory => {
            res.status(200).json(newCategory);
        }, err => {
            res.status(500).json({error: "Failed to save to file."});
        })
    }
}

module.exports = menuController;