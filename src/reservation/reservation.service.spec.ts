import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService, PrismaService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should throw error for reservations outside open hours', async () => {
    const dto = {
      customerId: 1,
      tableId: 1,
      startTime: '2024-11-19T08:00:00Z', // Before open hour
      endTime: '2024-11-19T09:00:00Z',
    };

    await expect(service.createReservation(dto)).rejects.toThrow(
      'Reservations must be made during open hours.',
    );
  });

  it('should throw error for conflicting reservations', async () => {
    prisma.reservation.findFirst = jest.fn().mockResolvedValue({ id: 1 });
    const dto = {
      customerId: 1,
      tableId: 1,
      startTime: '2024-11-19T12:00:00Z',
      endTime: '2024-11-19T13:00:00Z',
    };

    await expect(service.createReservation(dto)).rejects.toThrow(
      'Table is already booked for the requested time slot.',
    );
  });

  it('should create a reservation', async () => {
    prisma.reservation.findFirst = jest.fn().mockResolvedValue(null);
    prisma.reservation.create = jest.fn().mockResolvedValue({
      id: 1,
      customerId: 1,
      tableId: 1,
      startTime: '2024-11-19T12:00:00Z',
      endTime: '2024-11-19T13:00:00Z',
    });
    prisma.customer.findUnique = jest.fn().mockResolvedValue({
      id: 1,
      email: 'customer@example.com',
    });

    const dto = {
      customerId: 1,
      tableId: 1,
      startTime: '2024-11-19T12:00:00Z',
      endTime: '2024-11-19T13:00:00Z',
    };

    const reservation = await service.createReservation(dto);
    expect(reservation).toHaveProperty('id', 1);
  });
});
