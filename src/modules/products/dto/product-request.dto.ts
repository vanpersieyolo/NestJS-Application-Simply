import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
