import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category';
import { Discount } from './entity/discount.entity';
import { Nestedreview } from './entity/nestedreview.entity';
import { Product } from './entity/product.entity';
import { ProductVariant } from './entity/productVariant.entity';
import { Review } from './entity/review.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Review, Nestedreview, Discount, ProductVariant])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
