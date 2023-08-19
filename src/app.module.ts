import { ServeStaticModule } from '@nestjs/serve-static';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { AllExceptionFilter } from './filter/exception.filter';
import { LoggerModule } from './logger/logger.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ProductModule } from './modules/products/product.module';
import { ValidatorModule } from './validators/validator.module';
import { MediaStorageModule } from './media-storage/media-storage.module';
import { UserRepository } from './modules/users/user.repository';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerBehindProxyGuard } from './modules/auth/guards/throttler-proxy.guard';
import { OrderModule } from './modules/orders/orders.module';
import { OrderItemItemModule } from './modules/order-items/order-items.module';
import { CartModule } from './modules/carts/carts.module';
import { join } from 'path';
import { WinstonLogger } from './logger/winston.logger';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('throttleTtl'),
        limit: config.get<number>('throttleLimit'),
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
    LoggerModule,
    AuthModule,
    ValidatorModule,
    DatabaseModule,
    ProductModule,
    MediaStorageModule,
    OrderModule,
    OrderItemItemModule,
    CartModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    WinstonLogger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '(.*)auth(.*)', method: RequestMethod.ALL },
        { path: '(.*)images(.*)', method: RequestMethod.GET },
        { path: '(.*)products(.*)', method: RequestMethod.GET },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
