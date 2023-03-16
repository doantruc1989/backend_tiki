import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { Hero } from 'src/homepage/entity/hero';
import { Bosuutap } from 'src/homepage/entity/bosuutap';
import { Thuonghieuchinhhang } from 'src/homepage/entity/thuonghieuchinhhang';
import { Thuonghieusaletet } from 'src/homepage/entity/thuonghieusaletet';
import { Province } from 'src/homepage/entity/Province.entity';
import { Category } from 'src/product/entity/category';
import { OrderItem } from 'src/cart/entity/OrderItem';
import { Discount } from 'src/product/entity/discount.entity';
import { Review } from 'src/product/entity/review.entity';
import { ProductVariant } from 'src/product/entity/productVariant.entity';
import { Nestedreview } from 'src/product/entity/nestedreview.entity';
import { Chat } from 'src/chat/entity/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: "localhost",
        port: 3306,
        username: "root",
        password: 'password',
        database: "db3",
        entities: [User, OrderItem, Chat, Review, Nestedreview, Discount, Product, ProductVariant, Category, Province,  Hero, Bosuutap, Thuonghieuchinhhang,Thuonghieusaletet],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
