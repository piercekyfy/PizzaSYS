const categories = [
    { title: "Pizza", menuItems: [
        { id: 0, title: "Margherita", price: 9.99, ingredientDesc: "Tomato, Cheese, Basil", desc: "Margherita, with Alfredo's homemade tomato sauce and a fresh basil garnish. 12' size."},
        { id: 1, title: "Pepperoni", price: 12.99, ingredientDesc: "Tomato, Cheese, Pepperoni", desc: "The classic pepperoni pizza, with Alfredo's homemade tomato sauce. 12' size."}
    ]}
],

indexController = {
    render: function(req,res) {   
        res.render('index', 
            { 
                menu: categories,
                user: null
            });
    }
}

module.exports = indexController;