import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationRepository } from './repositories/reservation.repository';

describe('ReservationRepository', () => {
  let repository: ReservationRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationRepository, PrismaService],
    }).compile();

    repository = module.get<ReservationRepository>(ReservationRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a reservation', async () => {
    const mockReservation = {
      id: 1,
      customerId: 1,
      tableId: 1,
      startTime: new Date('2024-11-19T12:00:00Z'),
      endTime: new Date('2024-11-19T13:00:00Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prisma.reservation.create = jest.fn().mockResolvedValue(mockReservation);

    const result = await repository.createReservation({
      customer: { connect: { id: 1 } },
      table: { connect: { id: 1 } },
      startTime: new Date('2024-11-19T12:00:00Z'),
      endTime: new Date('2024-11-19T13:00:00Z'),
    });

    expect(result).toEqual(mockReservation);
    expect(prisma.reservation.create).toHaveBeenCalledWith({
      data: {
        customer: { connect: { id: 1 } },
        table: { connect: { id: 1 } },
        startTime: new Date('2024-11-19T12:00:00Z'),
        endTime: new Date('2024-11-19T13:00:00Z'),
      },
    });
  });

  it('should find a conflicting reservation', async () => {
    const mockConflict = {
      id: 1,
      customerId: 1,
      tableId: 1,
      startTime: new Date('2024-11-19T12:00:00Z'),
      endTime: new Date('2024-11-19T13:00:00Z'),
    };

    prisma.reservation.findFirst = jest.fn().mockResolvedValue(mockConflict);

    const result = await repository.findConflictingReservation(
      1,
      new Date('2024-11-19T12:30:00Z'),
      new Date('2024-11-19T13:30:00Z'),
    );

    expect(result).toEqual(mockConflict);
    // expect(prisma.reservation.findFirst).toHaveBeenCalledWith({
    //   where: {
    //     tableId: 1,
    //     OR: [
    //       {
    //         startTime: { lte: new Date('2024-11-19T13:30:00Z') },
    //         endTime: { gte: new Date('2024-11-19T12:30:00Z') },
    //       },
    //       {
    //         startTime: new Date('2024-11-19T13:30:00Z'),
    //         endTime: new Date('2024-11-19T12:30:00Z'),
    //       },
    //     ],
    //   },
    // });
  });

});
