const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
module.exports = app;
app.use(cors());
app.use(morgan('dev'));
// body parsing middleware
app.use(express.json());
// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
// Send index.html for any other requests
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.use('/', require('./api'));

// error handling middleware
app.use((req, res, next) => {
  const error = Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
