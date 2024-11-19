import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './repositories/customer.repository';

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: CustomerRepository;

  const mockCustomer = { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', createdAt: new Date(), updatedAt: new Date() };

  const mockRepository = {
    create: jest.fn().mockResolvedValue(mockCustomer),
    findAll: jest.fn().mockResolvedValue([mockCustomer]),
    findById: jest.fn().mockResolvedValue(mockCustomer),
    update: jest.fn().mockResolvedValue(mockCustomer),
    delete: jest.fn().mockResolvedValue(mockCustomer),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, { provide: CustomerRepository, useValue: mockRepository }],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<CustomerRepository>(CustomerRepository);
  });

  it('should create a customer', async () => {
    const customer = await service.createCustomer({ name: 'John Doe', email: 'john@example.com', phone: '1234567890' });
    expect(repository.create).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com', phone: '1234567890' });
    expect(customer).toEqual(mockCustomer);
  });

  it('should return all customers', async () => {
    const customers = await service.getAllCustomers();
    expect(customers).toEqual([mockCustomer]);
  });

  it('should return a customer by ID', async () => {
    const customer = await service.getCustomerById(1);
    expect(customer).toEqual(mockCustomer);
  });

  it('should update a customer', async () => {
    const updatedCustomer = await service.updateCustomer(1, { name: 'Jane Doe' });
    expect(repository.update).toHaveBeenCalledWith(1, { name: 'Jane Doe' });
    expect(updatedCustomer).toEqual(mockCustomer);
  });

  it('should delete a customer', async () => {
    const deletedCustomer = await service.deleteCustomer(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(deletedCustomer).toEqual({ message: 'Customer successfully deleted' });
  });
});
