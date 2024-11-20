import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: 'The ID of the customer making the reservation',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    description: 'The ID of the table being reserved',
    example: 5,
  })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  tableId: number;

  @ApiProperty({
    description: 'The start time of the reservation in ISO 8601 format',
    example: '2024-11-20T12:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({
    description: 'The end time of the reservation in ISO 8601 format',
    example: '2024-11-20T20:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}
