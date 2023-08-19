import { AuthUser } from './../../decorators/auth.user.decorator';
import { UserInfo } from './../../common/user-info';
import { PageDto } from './../../common/dto/pagination.dto';
import { PageOptionsDto } from './../../common/dto/pagination-options.dto';
import {
  UseInterceptors,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    return this.userService.findAllAndPaging(pageOptionsDto);
  }

  @Get('/me')
  async myProfile(@AuthUser() authUser: UserInfo): Promise<UserInfo> {
    const user = await this.userService.findById(authUser.id);
    return plainToClass(UserInfo, user, {
      excludeExtraneousValues: true,
    });
  }
}
