import { UserInfo } from './../../common/user-info';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './../../utils/base.service';
import { Injectable } from '@nestjs/common';
import { Cart } from './carts.entity';
import { CartRepository } from './carts.repository';
import { CreateCartDto } from './dto/cart-request.dto';

@Injectable()
export class CartService extends BaseService<Cart> {
  constructor(
    @InjectRepository(Cart)
    public repository: CartRepository,
  ) {
    super(repository);
  }

  /**
   * create or update cart
   * @param body
   * @param authUser
   */
  async createOrUpdateCart(body: CreateCartDto, authUser: UserInfo) {
    if (!body.cart_info.items.length && body.id) {
      await this.repository.delete(body.id);
      return null;
    }
    return this.repository.save({ ...body, user_id: authUser.id } as Cart);
  }
}
