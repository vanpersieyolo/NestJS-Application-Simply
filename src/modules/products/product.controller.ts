import { PageDto } from './../../common/dto/pagination.dto';
import { PageOptionsDto } from './../../common/dto/pagination-options.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiError } from './../../filter/api.error';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto/product-request.dto';
import { IProduct } from './interfaces/product.interface';
import { Product } from './product.entity';

@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductList(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    return this.productService.findAllAndPaging(pageOptionsDto);
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateProductDto })
  async register(@Body() body: CreateProductDto): Promise<IProduct> {
    const productExist = await this.productService.findOne({ name: body.name });

    if (productExist) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'product existed');
    }

    return this.productService.store(new Product(body));
  }

  @Put()
  @ApiBearerAuth()
  @ApiBody({ type: UpdateProductDto })
  async updateProduct(@Body() body: UpdateProductDto): Promise<IProduct> {
    const productExist = await this.productService.findOne({ id: body.id });

    if (!productExist) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'product not found');
    }

    return this.productService.store(new Product(body));
  }

  @Delete(':id')
  @ApiBearerAuth()
  async deleteProduct(@Param('id') id: number): Promise<IProduct> {
    const productExist = await this.productService.findOne({ id });

    if (!productExist) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'product not exist');
    }

    await this.productService.delete(id);
    return productExist;
  }
}
