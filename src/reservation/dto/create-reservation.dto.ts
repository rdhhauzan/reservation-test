import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  tableId: number;

  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}
