const { AccountController } = require('../controllers/AccountController');

const AccountRoutes = require('express').Router();

const accountController = new AccountController();

AccountRoutes.post('/account', accountController.create);
AccountRoutes.get('/statement/:cpf', accountController.getStatementByCpf);

module.exports = { AccountRoutes };