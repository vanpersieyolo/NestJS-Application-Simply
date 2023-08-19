import { UserRepository } from './../modules/users/user.repository';
import { User } from './../modules/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, HttpStatus, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ApiError } from '../filter/api.error';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject()
  private readonly config: ConfigService;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = 'Bearer ' + req.headers.authorization;

    if (authHeaders?.split(' ')[1]) {
      const token = authHeaders.split(' ')[1];
      try {
        const decoded: any = jwt.verify(token, this.config.get('jwtSecretKey'));
        const user = await this.userRepository.findOne({
          email: decoded.email,
        });
        if (!user) {
          throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
        }
        req['user'] = user;

        next();

        res.on('finish', () => {});
      } catch (error) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
      }
    } else {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }
  }
}
