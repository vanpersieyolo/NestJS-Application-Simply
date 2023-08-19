import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['name'])
  @Column()
  name: string;

  @Column({ name: 'price' })
  price: number;

  @Column()
  image: string;

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

  constructor(partial: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }
}
