import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  address: number;

  @Column()
  total_amount: number;

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

  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }
}
