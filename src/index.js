require('dotenv').config();
const path = require('path');
const express = require('express');
const mongo = require('mongoose');

const indexRouter = require('./routes/index.js');
const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');

const MenuCategory = require('./models/MenuCategory.js');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use("/dist/bootstrap.min.js", express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter)

mongo.connect(process.env.DB_URL);

const test = new MenuCategory({ title: "Pasta", MenuItems: [ { title: "Margherita", price: 9.99, ingredientDesc: "Tomato, Cheese, Basil", desc: "Margherita, with Alfredo's homemade tomato sauce and a fresh basil garnish. 12' size."} ]})
test.save();

MenuCategory.findById(test._id).exec().then(found => {
  console.log(found);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});