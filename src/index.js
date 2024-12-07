require('dotenv').config();
const path = require('path');
const express = require('express');
const mongo = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt')
const session = require('express-session')


// server
const indexRouter = require('./server/routes/index');
const loginRouter = require('./server/routes/login');
const registerRouter = require('./server/routes/register');

// api
const menuRouter = require('./api/routes/menu');
const usersRouter = require('./api/routes/users');

const MenuCategory = require('./api/models/MenuCategory.js');
const User = require('./api/models/User.js');

const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express();
const port = process.env.PORT ?? 3000;


if(process.env.SSL_KEY) {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  const credentials = { key: process.env.SSL_KEY, cert: process.env.SSL_CERT }
  http.createServer(app).listen(port)
  https.createServer(credentials, app).listen(443)
  console.log("Created HTTPS Server")
}


app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'pug');

app.use(require('cors')())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use(passport.session())
app.use(passport.authenticate('session'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public/')));
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

  if(!await User.exists({email: "test@test.com"})) {
    new User({name: "Test Test", email: "test@test.com", password: await bcrypt.hash("test", 10), phone: '083123452', address: 'Test Address Test Street', eircode: "Y35W8H2"}).save();
  }
})();

passport.serializeUser((user, next) => {
  next(null, { id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address, eircode: user.eircode })
})

passport.deserializeUser((user, next) => {
  next(null, user)
})

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, next) => {
  let user = null;

  try {
    user = await User.findOne({email: email})
  } catch (err) {
    return next(err)
  }


  if(!user)
    return next(null, false, { message: 'Incorrect username or password.' });

  if(await bcrypt.compare(password, user.password)) {
    return next(null, user)
  } else {
    return next(null, false, { message: 'Incorrect username or password.' });
  }
}))

if(process.env.SSL_KEY === undefined) {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  });
}