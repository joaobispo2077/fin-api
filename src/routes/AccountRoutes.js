const { Conflict } = require('../errors/Conflict');
const { NotFound } = require('../errors/NotFound');
const { v4: uuid } = require('uuid');

const customers = [];

const getCustomerByCpf = (cpf) => {
  const customer = customers.find(customer => customer.cpf === cpf);
  return customer;
}

const getBalanceByStatements = (statements) => {
  const balance = statements.reduce((acc, actualStatement) => {
    if (actualStatement.type === 'credit') {
      return acc + actualStatement.amount;
    }

    if (actualStatement.type === 'debit') {
      return acc - actualStatement.amount;
    }


    return acc;
  }, 0);

  return balance;
}

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
    statements: [],
  };
  customers.push(account);

  return response.status(201).json(account);
});

AccountRoutes.get('/account', ensureExistsAccount, async (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer);
});

AccountRoutes.delete('/account', ensureExistsAccount, async (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);
  return response.status(204).send();
});

AccountRoutes.put('/account', ensureExistsAccount, async (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;
  return response.status(200).send();
});

AccountRoutes.get('/statements', ensureExistsAccount, async (request, response) => {
  const { customer } = request;

  return response.json({ statements: customer.statements });
});

AccountRoutes.get('/statements/date', ensureExistsAccount, async (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const normalizedDate = new Date(date + ' 00:00').toDateString();

  const statements = customer.statements.filter(statement => {
    console.log(new Date(statement.created_at).toDateString());
    return new Date(statement.created_at).toDateString() === normalizedDate;
  }
  );

  return response.json({ statements: statements });
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

  customer.statements.push(statementOperation);

  return response.status(201).send();
});

AccountRoutes.get('/balance', ensureExistsAccount, async (request, response) => {
  const { customer } = request;

  const balance = getBalanceByStatements(customer.statements);

  response.status(200).json({ balance: balance });
});

AccountRoutes.post('/widthdraw', ensureExistsAccount, async (request, response) => {
  const { amount } = request.body;

  const { customer } = request;

  const balance = getBalanceByStatements(customer.statements);

  const isInsuficientFunds = balance < amount;
  if (isInsuficientFunds) {
    throw new Conflict('Insufficient funds.');
  }

  const statementOperation = {
    amount: amount,
    created_at: new Date(),
    type: 'debit'
  };

  customer.statements.push(statementOperation);

  return response.status(201).send();
});

module.exports = { AccountRoutes };