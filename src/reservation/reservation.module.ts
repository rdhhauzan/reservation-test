import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './repositories/reservation.repository';
import { CustomerRepository } from 'src/customer/repositories/customer.repository';
import { TableRepository } from 'src/table/repositories/table.repository';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, CustomerRepository, TableRepository],
})
export class ReservationModule { }
