import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../../../src/enum/order.enum';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly limit?: number = 20;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
