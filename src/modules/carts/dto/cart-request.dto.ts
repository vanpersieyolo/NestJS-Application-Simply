import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CartItemDto {
  @ApiProperty()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}

export class CartInfoDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => CartItemDto)
  @ValidateNested()
  items: CartItemDto[];
}

export class CreateCartDto {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CartInfoDto)
  cart_info: CartInfoDto;
}
