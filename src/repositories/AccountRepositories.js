class AccountRepository {
  constructor() {
    this.accounts = [];
  }

  async save(account) {
    this.accounts.push(account);
  }
}

module.exports = { AccountRepository };