/**
 *  cpf - string
 *  name - string
 *  id - uuid
 *  statement - string
 */
const { v4: uuid } = require('uuid');
const { AccountRepository } = require('../repositories/AccountRepositories');

class AccountService {
  constructor(accountRepository = new AccountRepository()) {
    this.accountRepository = accountRepository;
  }

  async create({ cpf, name }) {
    const id = uuid();

    const account = {
      name,
      id,
      cpf
    };

    await this.accountRepository.save(account);

    return account;
  }

  getStatementById() { }

  getStatementByDate() { }

  deposit() { }

  widthdrawal() { }

  updateById() { }

  getById() { }

  removeById() { }
}

module.exports = AccountService;