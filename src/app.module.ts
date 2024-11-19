import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { PrismaModule } from './prisma/prisma.module';
import { TableModule } from './table/table.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [CustomerModule, PrismaModule, TableModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
