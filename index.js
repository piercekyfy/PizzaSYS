const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index.js');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})