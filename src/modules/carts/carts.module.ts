import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from './carts.repository';
import { CartService } from './carts.service';
import { CartController } from './carts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
