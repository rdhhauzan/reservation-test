import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({
    description: 'The table number (e.g., A1, B2)',
    example: 'A1',
  })
  @IsString()
  @IsNotEmpty()
  tableNumber: string;

  @ApiProperty({
    description: 'The seating capacity of the table',
    example: 4,
  })
  @Type(() => Number)
  @IsInt()
  capacity: number;

  @ApiProperty({
    description: 'Indicates whether the table is available for reservation',
    example: true,
  })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isAvailable: boolean;
}
