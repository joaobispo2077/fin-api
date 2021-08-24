const { AccountController } = require('../controllers/AccountController');

const AccountRoutes = require('express').Router();

const accountController = new AccountController();

AccountRoutes.post('/account', accountController.create);

module.exports = { AccountRoutes };