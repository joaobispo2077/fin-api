const { Conflict } = require('../errors/Conflict');
const { NotFound } = require('../errors/NotFound');
const { v4: uuid } = require('uuid');

const customers = [];

const AccountRoutes = require('express').Router();

const ensureExistsAccount = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = getCustomerByCpf(cpf);

  if (!customer) {
    throw new NotFound('Customer was not found.');
  }

  request.customer = customer;
  return next();
};

const getCustomerByCpf = (cpf) => {
  const customer = customers.find(customer => customer.cpf === cpf);
  return customer;
}


AccountRoutes.post('/account', async (request, response) => {
  const { cpf, name } = request.body;

  const isCustomerAlreadyExists = getCustomerByCpf(cpf);
  if (isCustomerAlreadyExists) {
    throw new Conflict('Customer already exists.');
  }

  const id = uuid();
  const account = {
    name,
    id,
    cpf,
    statement: [],
  };
  customers.push(account);

  return response.status(201).json(account);
});

AccountRoutes.get('/statement', ensureExistsAccount, async (request, response) => {
  const { customer } = request;

  return response.json({ statement: customer.statement });
});

AccountRoutes.post('/deposit', ensureExistsAccount, async (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description: description,
    amount: amount,
    created_at: new Date(),
    type: 'credit'
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

module.exports = { AccountRoutes };