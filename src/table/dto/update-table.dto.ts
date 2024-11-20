import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTableDto {
  @ApiProperty({
    description: 'The table number (e.g., A1, B2). If not provided, the current value will remain unchanged.',
    example: 'A1',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  tableNumber: string;

  @ApiProperty({
    description: 'The seating capacity of the table. If not provided, the current value will remain unchanged.',
    example: 4,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  capacity: number;

  @ApiProperty({
    description: 'Indicates whether the table is available for reservation. If not provided, the current value will remain unchanged.',
    example: true,
    required: false,
  })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isAvailable: boolean;
}
