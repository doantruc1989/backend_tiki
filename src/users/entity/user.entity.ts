import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { SharedProp } from './sharedProp.helper';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Review } from 'src/product/entity/review.entity';
import { Nestedreview } from 'src/product/entity/nestedreview.entity';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ default: ' ' })
  public address: string;

  @Column({ default: ' ' })
  public username: string;

  @Column({ default: ' ' })
  public phone: string;

  @Column()
  @Length(8, 24)
  public password: string;

  @Column({
    default:
      'https://nhungdieuthuvi.com/wp-content/uploads/2021/08/avartar-vit-vang-psyduck.jpg',
  })
  image: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role[];

  @Column({
    nullable: true,
  })
  @Exclude()
  public refreshToken?: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'createdAt',
  })
  createdAt: Date;

  @OneToMany(() => Review, (review) => review.user,{
    onDelete: 'SET NULL'
  })
  review: Review[]
}
