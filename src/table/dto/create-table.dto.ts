import { IsBoolean, IsInt, IsNotEmpty, IsString, isNumber } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateTableDto {
  @IsString()
  @IsNotEmpty()
  tableNumber: string;

  @Type(() => Number)
  @IsInt()
  capacity: number;

  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isAvailable: boolean;
}
