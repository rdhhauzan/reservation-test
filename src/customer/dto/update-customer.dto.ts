import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiProperty({
    description: 'The updated name of the customer',
    example: 'Johnnnn Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The updated email address of the customer',
    example: 'jooohn.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The updated phone number of the customer',
    example: '12345222890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
