import { MailService } from './../../mail/mail.service';
import { ApiError } from './../../filter/api.error';
import { UserInfo } from './../../common/user-info';

import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserLoginDto } from './dto/user.dto';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async registerUser(body: CreateUserDto): Promise<UserInfo> {
    const userExist = await this.userRepository.findOne({
      email: body.email,
    });

    if (userExist) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'user existed');
    }

    const user = new User({
      ...body,
      password: await bcrypt.hash(
        body.password,
        this.configService.get<number>('bcryptSalt'),
      ),
    });

    const data = await this.userRepository.save(user);

    const payload: UserInfo = {
      id: data.id,
      email: data.email,
    };

    data['access_token'] = this.jwtService.sign(payload);

    return plainToClass(
      UserInfo,
      {},
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async generateJwtToken(user: UserLoginDto): Promise<UserInfo> {
    const currentUser = await this.userRepository.findOne({
      email: user.email,
    });

    if (!currentUser) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    const isMatch = await bcrypt.compare(user.password, currentUser.password);

    if (!isMatch) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Password wrong');
    }

    const payload: UserInfo = {
      id: currentUser.id,
      email: currentUser.email,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      ...payload,
      access_token: access_token,
    };
  }
}
