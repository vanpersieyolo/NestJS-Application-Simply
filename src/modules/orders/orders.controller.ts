import { UserInfo } from './../../common/user-info';
import { AuthUser } from './../../decorators/auth.user.decorator';
import { MailService } from './../../mail/mail.service';
import { OrderItemService } from './../order-items/order-items.service';
import { PageDto } from './../../common/dto/pagination.dto';
import { PageOptionsDto } from './../../common/dto/pagination-options.dto';
import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { OrderService } from './orders.service';
import { Order } from './orders.entity';
import { CreateOrderDto } from './dto/order-request.dto';
import { OrderItem } from '../order-items/order-items.entity';

@Controller('orders')
@ApiTags('Order')
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly OrderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  async getOrderList(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Order>> {
    return this.OrderService.findAllAndPaging(pageOptionsDto);
  }

  @Post()
  @ApiBody({ type: CreateOrderDto })
  async creatOrder(
    @Body() body: CreateOrderDto,
    @AuthUser() authUser: UserInfo,
  ): Promise<Order> {
    const orderCreated = await this.OrderService.store(body);

    // create order_items
    const orderItems: OrderItem[] = body.order_items.map(
      (item) =>
        ({
          order_id: orderCreated.id,
          product_id: item.product_id,
          quantity: item.quantity,
        } as OrderItem),
    );

    await this.orderItemService.store(orderItems);

    // send email confirm
    await this.mailService.sendUserConfirmation(authUser);

    return orderCreated;
  }
}
