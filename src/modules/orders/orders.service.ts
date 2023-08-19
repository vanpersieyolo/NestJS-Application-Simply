import { PageMetaDto } from './../../common/dto/pagination-meta.dto';
import { PageDto } from './../../common/dto/pagination.dto';
import { PageOptionsDto } from './../../common/dto/pagination-options.dto';
import { BaseService } from '../../utils/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: OrderRepository,
  ) {
    super(OrderRepository);
  }

  /**
   *
   * @param pageOptionsDto
   * @returns
   */
  async findAllAndPaging(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Order>> {
    const qb = this.repository.createQueryBuilder('pr');
    qb.orderBy('pr.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    const itemCount = await qb.getCount();
    const { entities } = await qb.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
