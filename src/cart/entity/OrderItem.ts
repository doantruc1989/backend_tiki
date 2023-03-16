import { Expose } from 'class-transformer';
import { SharedProp } from 'src/users/entity/sharedProp.helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column()
  address: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column({default: 'cod'})
  payment: string;

  @Column({default: false })
  isPaid: boolean;

  @Column()
  trans: string;

  @Column('longtext')
  orderItems: string;

  @Column('float', { name: 'cartTotal', precision: 12, default: () => "'0'" })
  cartTotal: number;

  @Column('float', { name: 'revenue', precision: 12, default: () => "'0'" })
  revenue: number;

  @Column({ default: () => 0 })
  status: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'createdAt',
  })
  createdAt: Date;
}
