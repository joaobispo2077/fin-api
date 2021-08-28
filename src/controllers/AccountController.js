const AccountService = require("../services/AccountServices");

const accountService = new AccountService();

class AccountController {

  async create(request, response) {
    const { cpf, name } = request.body;

    const createdAccount = await accountService.create({
      cpf,
      name
    });

    return response.status(201).json(createdAccount);
  }

  async getStatementByCpf(request, response) {
    const { cpf } = request;

    const statement = await accountService.getStatementByCpf(cpf);
    return response.json(statement);
  }

  async deposit(request, response) {

  }
}

module.exports = { AccountController };