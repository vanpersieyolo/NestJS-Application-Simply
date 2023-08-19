import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { OrderItemItemModule } from '../order-items/order-items.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository]), OrderItemItemModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
