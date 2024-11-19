require('dotenv').config();
const path = require('path');
const express = require('express');
const mongo = require('mongoose');

// server
const indexRouter = require('./server/routes/index');
const loginRouter = require('./server/routes/login');
const registerRouter = require('./server/routes/register');

// api
const menuRouter = require('./api/routes/menu');
const usersRouter = require('./api/routes/users');

const MenuCategory = require('./api/models/MenuCategory.js');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use("/dist/bootstrap.min.js", express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter)

app.use('/api/menu', menuRouter);
app.use('/api/users', usersRouter);

mongo.connect(process.env.DB_URL);


(async () => {
  if(!await MenuCategory.exists({title: 'Pizza'})) {
    new MenuCategory({ title: "Pizza", menuItems: [
      { id: 0, title: "Margherita", price: 9.99, ingredientDesc: "Tomato, Cheese, Basil", desc: "Margherita, with Alfredo's homemade tomato sauce and a fresh basil garnish. 12' size."},
      { id: 1, title: "Pepperoni", price: 12.99, ingredientDesc: "Tomato, Cheese, Pepperoni", desc: "The classic pepperoni pizza, with Alfredo's homemade tomato sauce. 12' size."}
    ]}).save();
  }

  if(!await MenuCategory.exists({title: 'Pasta'})) {
    new MenuCategory({ title: "Pasta", menuItems: [
      { id: 0, title: "Spaghetti", price: 13.00, ingredientDesc: "Dummy", desc: "Dummy Desc"},
      { id: 1, title: "Carbonara", price: 15.49, ingredientDesc: "Dummy2", desc: "Dummy Desc2."}
    ]}).save();
  }
  
})();

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});