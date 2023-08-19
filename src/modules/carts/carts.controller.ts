import { UserInfo } from './../../common/user-info';
import { AuthUser } from './../../decorators/auth.user.decorator';
import { Cart } from './carts.entity';
import { CartService } from './carts.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateCartDto } from './dto/cart-request.dto';

@Controller('carts')
@ApiTags('Cart')
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiBody({ type: CreateCartDto })
  async createOrUpdateCart(
    @Body() body: CreateCartDto,
    @AuthUser() authUser: UserInfo,
  ): Promise<Cart> {
    return this.cartService.createOrUpdateCart(body, authUser);
  }

  @Get()
  async getCart(@AuthUser() authUser: UserInfo): Promise<Cart> {
    return this.cartService.findOne({ user_id: authUser.id });
  }
}
