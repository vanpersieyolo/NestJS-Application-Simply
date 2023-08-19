import { WinstonLogger } from './../../logger/winston.logger';
import { UserInfo } from './../../common/user-info';
import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: WinstonLogger,
  ) {}

  @Get('/')
  ping(): string {
    return 'pong!';
  }

  @Post('/login')
  login(@Body() body: UserLoginDto): Promise<UserInfo> {
    this.logger.log(`LOGIN: ${body.email}  logined`);
    return this.authService.generateJwtToken(body);
  }

  @Post('/register')
  @ApiBody({ type: CreateUserDto })
  register(@Body() body: CreateUserDto): Promise<UserInfo> {
    return this.authService.registerUser(body);
  }
}
