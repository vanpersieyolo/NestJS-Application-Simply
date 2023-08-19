import { EntityRepository, Repository } from 'typeorm';
import { OrderItem } from './order-items.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> {
  getAllOrderItems(): Promise<OrderItem[]> {
    return this.createQueryBuilder().getMany();
  }
}
