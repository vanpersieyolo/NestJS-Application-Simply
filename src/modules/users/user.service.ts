import { PageMetaDto } from './../../common/dto/pagination-meta.dto';
import { PageDto } from './../../common/dto/pagination.dto';
import { PageOptionsDto } from './../../common/dto/pagination-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './../../utils/base.service';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    public repository: UserRepository,
  ) {
    super(repository);
  }

  /**
   *
   * @param pageOptionsDto
   * @returns
   */
  async findAllAndPaging(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    const qb = this.repository.createQueryBuilder('user');
    qb.orderBy('user.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    const itemCount = await qb.getCount();
    const { entities } = await qb.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
