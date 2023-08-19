import { AuthService } from './../modules/auth/auth.service';
import { UserRepository } from './../modules/users/user.repository';
import { UserService } from './../modules/users/user.service';
import { UserModule } from './../modules/users/user.module';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PasswordConfirmValidator } from './password-confirm.validator';

@Global()
@Module({
  imports: [
    UserModule,
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
  ],
  providers: [
    PasswordConfirmValidator,
    UserService,
    AuthService,
    UserRepository,
  ],
  exports: [PasswordConfirmValidator],
})
export class ValidatorModule {}
