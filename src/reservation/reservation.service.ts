import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationRepository } from './repositories/reservation.repository';

@Injectable()
export class ReservationService {
  private readonly openHour = 10; // 10 AM
  private readonly closeHour = 22; // 10 PM

  constructor(private readonly prisma: PrismaService, private readonly reservationRepository: ReservationRepository) { }

  async createReservation(dto: CreateReservationDto) {
    const { customerId, tableId, startTime, endTime } = dto;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start.getHours() < this.openHour || end.getHours() >= this.closeHour) {
      throw new BadRequestException('Reservations must be made during open hours.');
    }

    const conflict = await this.reservationRepository.findConflictingReservation(
      tableId,
      start,
      end,
    );

    if (conflict) {
      throw new BadRequestException('Table is already booked for the requested time slot.');
    }

    const reservation = await this.reservationRepository.createReservation({
      customer: { connect: { id: customerId } },
      table: { connect: { id: tableId } },
      startTime: start,
      endTime: end,
    });

    await this.sendConfirmationEmail(customerId, reservation);

    return reservation;
  }

  private async sendConfirmationEmail(customerId: number, reservation: any) {
    // Fetch customer email
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) throw new BadRequestException('Customer not found.');

    console.log(
      `Email sent to ${customer.email}: Your reservation for table ${reservation.tableId
      } is confirmed from ${reservation.startTime.toISOString()} to ${reservation.endTime.toISOString()}.`,
    );
  }
}
