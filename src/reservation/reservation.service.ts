import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationRepository } from './repositories/reservation.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { CustomerRepository } from 'src/customer/repositories/customer.repository';
import { TableRepository } from 'src/table/repositories/table.repository';

@Injectable()
export class ReservationService {
  private readonly openHour = 10; // 10 AM
  private readonly closeHour = 22; // 10 PM

  constructor(private readonly prisma: PrismaService, private readonly reservationRepository: ReservationRepository, private readonly customerRepository: CustomerRepository, private readonly tableRepository: TableRepository, private readonly mailService: MailerService) { }

  async createReservation(dto: CreateReservationDto) {
    const { customerId, tableId, startTime, endTime } = dto;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start.getHours() < this.openHour || end.getHours() >= this.closeHour) {
      throw new BadRequestException('Reservations must be made during open hours.');
    }

    const isCustomerExistInDatabase = await this.customerRepository.findById(customerId)

    if (!isCustomerExistInDatabase) {
      throw new BadRequestException('Customer not found');
    }

    const isTableExistInDatabase = await this.tableRepository.findById(tableId)

    if (!isTableExistInDatabase) {
      throw new BadRequestException('Table not found');
    }

    console.log(isTableExistInDatabase)

    const isTableAvailable = isTableExistInDatabase?.isAvailable

    if (!isTableAvailable) {
      throw new BadRequestException('Table is not available');
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

    await this.reservationRepository.setTableToNotAvailable(tableId)
    await this.sendConfirmationEmail(customerId, reservation);

    return reservation;
  }

  private async sendConfirmationEmail(customerId: number, reservation: any) {
    // Fetch customer email
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    function formatDate(date) {
      return new Date(date).toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'long', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
    }

    if (!customer) throw new BadRequestException('Customer not found.');

    console.log(
      `Email sent to ${customer.email}: Your reservation for table ${reservation.tableId
      } is confirmed from ${reservation.startTime.toISOString()} to ${reservation.endTime.toISOString()}.`,
    );

    // Complex and personalized email message
    const message = `
      Dear ${customer.name},

      Thank you for choosing Restaurant XYZ! We are excited to confirm your reservation details:

      Reservation Summary:
      ----------------------
      Table Number: ${reservation.tableId}
      Reservation Date: ${formatDate(reservation.createdAt)}
      Duration: From ${formatDate(reservation.startTime)} to ${formatDate(reservation.endTime)}

      We look forward to welcoming you at our restaurant, and we hope you have a delightful experience with us. Whether you're here for a special occasion or just a casual meal, we are committed to providing you with an unforgettable dining experience.

      If you have any specific requests or need to make changes to your reservation, don't hesitate to contact us at 08772838329 or ridhohauzan@gmail.com or cs@xyz-restaurant.com. Our team is here to ensure your visit is nothing short of perfect!

      Location:
      ---------
      Restaurant XYZ
      Jl. Manggis No. 123
      https://xyz-restaurant.com

      Please arrive a few minutes early to ensure a smooth seating experience. If you are running late or need to cancel, kindly let us know in advance.

      We look forward to seeing you soon!

      Warm regards,
      The Restaurant XYZ Team

      P.S. Be sure to check out our seasonal specials on the menu during your visit!

      --------------------------
      This is an automated email. Please do not reply directly to this message.
    `;

    this.mailService.sendMail({
      from: 'Reservation App <ridhohauzan@gmail.com>',
      to: customer.email,
      subject: `Reservation Confirmation for Table ${reservation.tableId} at Restaurant XYZ`,
      text: message,
    });
  }

}
