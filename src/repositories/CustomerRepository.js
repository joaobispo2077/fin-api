class CustomerRepository {
  constructor() {
    this.customers = [];
  }

  async save(customer) {
    this.customers.push(customer);
  }

  async getByCPF(cpf) {

    const customer = this.customers.find(customer => customer.cpf === cpf);
    return customer;
  }
}

module.exports = { CustomerRepository };