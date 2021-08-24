/**
 *  cpf - string
 *  name - string
 *  id - uuid
 *  statement - string
 */
const { Conflict } = require('../errors/Conflict');
const { v4: uuid } = require('uuid');
const { CustomerRepository } = require('../repositories/CustomerRepository');

class AccountService {
  constructor(customerRepository = new CustomerRepository()) {
    this.customerRepository = customerRepository;
  }

  async getStatementByCpfg(cpf) {
    return await this.customerRepository.getByCPF(cpf);
  }


  async create({ cpf, name }) {
    const isCustomerAlreadyExists = await this.customerRepository.getByCPF(cpf);
    console.info(isCustomerAlreadyExists);

    if (isCustomerAlreadyExists) {
      throw new Conflict('Customer already exists.');
    }

    const id = uuid();

    const account = {
      name,
      id,
      cpf
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