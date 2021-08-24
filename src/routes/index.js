const { AccountRoutes } = require('./AccountRoutes');

const routes = require('express').Router();

routes.use(AccountRoutes);


module.exports = routes;