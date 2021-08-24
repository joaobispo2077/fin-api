class CustomerRepository {
  constructor() {
    this.customers = [];
  }

  async save(customer) {
    this.customers.push(customer);
  }

  async getByCPF(cpf) {

    return this.customers.find(customer => customer.cpf === cpf);
  }
}

module.exports = { CustomerRepository };