import { PageMetaDto } from './../../common/dto/pagination-meta.dto';
import { PageDto } from './../../common/dto/pagination.dto';
import { PageOptionsDto } from './../../common/dto/pagination-options.dto';
import { BaseService } from '../../utils/base.service';
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
  ) {
    super(productRepository);
  }

  /**
   *
   * @param pageOptionsDto
   * @returns
   */
  async findAllAndPaging(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
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
