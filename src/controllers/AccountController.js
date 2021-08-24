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
}

module.exports = { AccountController };