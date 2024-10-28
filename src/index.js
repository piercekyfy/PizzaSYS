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

// const test = new MenuCategory({ title: "Pizza", MenuItems: [ { title: "Margherita", price: 9.99, ingredientDesc: "Tomato, Cheese, Basil", desc: "Margherita, with Alfredo's homemade tomato sauce and a fresh basil garnish. 12' size."} ]})
// test.save();

// MenuCategory.findById(test._id).exec().then(found => {
//   console.log(found);
// })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});