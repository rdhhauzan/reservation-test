import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) { }

  async createCustomer(data: CreateCustomerDto) {
    return this.customerRepository.create(data);
  }

  async getAllCustomers() {
    return this.customerRepository.findAll();
  }

  async getCustomerById(id: number) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async updateCustomer(id: number, data: UpdateCustomerDto) {
    return this.customerRepository.update(id, data);
  }

  async deleteCustomer(id: number) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    await this.customerRepository.delete(id);
    return { message: 'Customer successfully deleted' };
  }
}
