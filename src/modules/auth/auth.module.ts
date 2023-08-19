import { WinstonLogger } from './../../logger/winston.logger';
import { MailModule } from './../../mail/mail.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { UserRepository } from '../users/user.repository';
import { UserService } from '../users/user.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecretKey'),
        signOptions: {
          expiresIn: configService.get<string>('jwtExpiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    MailModule,
  ],
  providers: [AuthService, UserService, UserRepository, WinstonLogger],
  controllers: [AuthController],
  exports: [AuthService, UserService, UserRepository],
})
export class AuthModule {}
