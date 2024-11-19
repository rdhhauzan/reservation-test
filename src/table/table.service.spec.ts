import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TableRepository } from './repositories/table.repository';
import { Prisma } from '@prisma/client';

describe('TableService', () => {
  let repository: TableRepository;
  let prisma: PrismaService;

  const mockTable = {
    id: 1,
    tableNumber: 'A1',
    capacity: 4,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    table: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TableRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<TableRepository>(TableRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a table', async () => {
    mockPrismaService.table.create.mockResolvedValue(mockTable);

    const result = await repository.create({
      tableNumber: 'A1',
      capacity: 4,
      isAvailable: true,
    });

    expect(prisma.table.create).toHaveBeenCalledWith({
      data: { tableNumber: 'A1', capacity: 4, isAvailable: true },
    });
    expect(result).toEqual(mockTable);
  });

  it('should return all tables', async () => {
    mockPrismaService.table.findMany.mockResolvedValue([mockTable]);

    const result = await repository.findAll();

    expect(prisma.table.findMany).toHaveBeenCalledWith();
    expect(result).toEqual([mockTable]);
  });

  it('should return a table by ID', async () => {
    mockPrismaService.table.findUnique.mockResolvedValue(mockTable);

    const result = await repository.findById(1);

    expect(prisma.table.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockTable);
  });

  it('should return null if table not found', async () => {
    mockPrismaService.table.findUnique.mockResolvedValue(null);

    const result = await repository.findById(99);

    expect(prisma.table.findUnique).toHaveBeenCalledWith({ where: { id: 99 } });
    expect(result).toBeNull();
  });

  it('should update a table by ID', async () => {
    const updatedTable = { ...mockTable, capacity: 6 };
    mockPrismaService.table.update.mockResolvedValue(updatedTable);

    const result = await repository.update(1, { capacity: 6 });

    expect(prisma.table.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { capacity: 6 },
    });
    expect(result).toEqual(updatedTable);
  });

  it('should delete a table by ID', async () => {
    mockPrismaService.table.delete.mockResolvedValue(mockTable);

    const result = await repository.delete(1);

    expect(prisma.table.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockTable);
  });
});
