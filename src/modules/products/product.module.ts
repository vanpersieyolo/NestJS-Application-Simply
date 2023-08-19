import { WinstonLogger } from './../../logger/winston.logger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [ProductService, WinstonLogger],
  controllers: [ProductController],
})
export class ProductModule {}
