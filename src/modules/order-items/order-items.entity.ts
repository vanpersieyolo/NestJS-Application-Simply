import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order_items' })
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
    name: 'created_at',
  })
  created_at: string;

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
    name: 'updated_at',
  })
  updated_at: string;

  constructor(partial: Partial<OrderItem>) {
    super();
    Object.assign(this, partial);
  }
}
