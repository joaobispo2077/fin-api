/**
 *  cpf - string
 *  name - string
 *  id - uuid
 *  statement - string
 */
const { v4: uuid } = require('uuid');

const { CustomerRepository } = require('../repositories/CustomerRepository');

const { Conflict } = require('../errors/Conflict');
const { NotFound } = require('../errors/NotFound');

class AccountService {
  constructor(customerRepository = new CustomerRepository()) {
    this.customerRepository = customerRepository;
  }

  async getStatementByCpf(cpf) {
    const customer = await this.customerRepository.getByCPF(cpf);

    if (!customer) {
      throw new NotFound('Customer was not found.');
    }

    return customer.statement;
  }


  async create({ cpf, name }) {
    const isCustomerAlreadyExists = await this.customerRepository.getByCPF(cpf);

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


    await this.customerRepository.save(account);

    return account;
  }


  getStatementByDate() { }

  deposit() { }

  widthdrawal() { }

  updateById() { }

  getById() { }

  removeById() { }
}

module.exports = AccountService;