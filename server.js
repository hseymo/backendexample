// import express
const express = require('express');
// import routes folder
const routes = require('./routes');
// set up sequelize connection
const sequelize = require('./config/connection');

// instantiating express
const app = express();
// bind port to env variable if live or default to localhost: 3001
const PORT = process.env.PORT || 3001;

// Requiring our models for syncing
// const { User, Blog } = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.json());
// i.e. data from tables - extended true for query params (after ?)
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
// switch to force: true to reset database if changes are made
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});