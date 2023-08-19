import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemRepository } from './order-items.repository';
import { OrderItemService } from './order-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemRepository])],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemItemModule {}
