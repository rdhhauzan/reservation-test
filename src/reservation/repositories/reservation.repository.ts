import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReservationRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createReservation(data: Prisma.ReservationCreateInput) {
    return this.prisma.reservation.create({ data });
  }

  async findConflictingReservation(
    tableId: number,
    startTime: Date,
    endTime: Date,
  ) {
    return this.prisma.reservation.findFirst({
      where: {
        tableId,
        OR: [
          {
            startTime: { lte: endTime },
            endTime: { gte: startTime },
          },
          {
            startTime: startTime,
            endTime: endTime,
          },
        ],
      },
    });
  }


  async findReservationById(id: number) {
    return this.prisma.reservation.findUnique({
      where: { id },
    });
  }

  async updateReservation(id: number, data: Prisma.ReservationUpdateInput) {
    return this.prisma.reservation.update({
      where: { id },
      data,
    });
  }

  async deleteReservation(id: number) {
    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}
