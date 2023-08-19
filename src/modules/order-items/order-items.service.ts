import { BaseService } from '../../utils/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './order-items.entity';
import { OrderItemRepository } from './order-items.repository';

@Injectable()
export class OrderItemService extends BaseService<OrderItem> {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: OrderItemRepository,
  ) {
    super(orderItemRepository);
  }
}
