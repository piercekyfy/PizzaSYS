const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index.js');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use("/dist/bootstrap.min.js", express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')));

app.use('/', indexRouter);
app.use('/register', (req, res, next) => {
  res.render('register');
})
app.use('/login', (req, res, next) => {
  res.render('login');
})
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});