import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;
}
