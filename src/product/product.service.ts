import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import EditProductDto from './dto/editProduct.dto';
import NewProductDto from './dto/newProduct.dto';
import { Product } from './entity/product.entity';
import { Category } from './entity/category';
import NewCategoryDto from './dto/newCategory.dto';
import EditCategoryDto from './dto/editCategory.tdo';
import SearchProductDto from './dto/searchProduct.dto';
import { Review } from './entity/review.entity';
import AddNestedReviewDto from './dto/addNestedReview.dto';
import { Nestedreview } from './entity/nestedreview.entity';
import AddReviewDto from './dto/addReview.dto';
import { ProductVariant } from './entity/productVariant.entity';
import EditProVariantdto from './dto/editProVariant.dto';
import NewProductVarDto from './dto/newProductVar.dto';
import editNestedReviewDto from './dto/editNestedReview.dto';
import SearchReviewDto from './dto/searchReview.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Nestedreview)
    private nestedReviewRepository: Repository<Nestedreview>,

    @InjectRepository(ProductVariant)
    private productVarRepository: Repository<ProductVariant>,

    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getAllProduct(page: number) {
    const countProducts = await this.productRepository.count();
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productvariant', 'productvariant')
      .leftJoinAndSelect('product.discount', 'discount')
      .leftJoinAndSelect('product.review', 'review')
      .skip(16 * (page - 1))
      .take(16)
      .getMany();
    return [product, countProducts];
  }

  async createProduct(newProductDto: NewProductDto) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categoryID', 'category')
      .insert()
      .into(Product)
      .values(newProductDto)
      .execute();
    return product;
  }

  async getProductByIdV2(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .where({ id: id })
      .leftJoinAndSelect('product.categoryID', 'category')
      .leftJoinAndSelect('product.productvariant', 'productvariant')
      .leftJoinAndSelect('product.discount', 'discount')
      .leftJoinAndSelect('product.review', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.nestedreview', 'nestedreview')
      .getMany();
    return product;
  }

  async getProductVarByIdV2(id: number) {
    const productVariant = await this.productVarRepository
      .createQueryBuilder('productvariant')
      .where({ id: id })
      .getMany();
    return productVariant;
  }

  async patchProductById(id: number, editProductDto: EditProductDto) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productvariant', 'productvariant')
      .where({ id: id })
      .update(editProductDto)
      .execute();
    return product;
  }

  async editProductVarByIdV2(id: number, editProVariantdto: EditProVariantdto) {
    const productVariant = await this.productVarRepository
      .createQueryBuilder('productvariant')
      .where({ id: id })
      .update(editProVariantdto)
      .execute();
    return productVariant;
  }

  async deleteProductVariantById(id: number) {
    const productVariant = await this.productVarRepository.delete(id);
    return productVariant;
  }

  async createProductVar(newProductVarDto: NewProductVarDto) {
    const productVar = await this.productVarRepository
      .createQueryBuilder('productvariant')
      .leftJoinAndSelect('productvariant.product', 'product')
      .insert()
      .into(ProductVariant)
      .values(newProductVarDto)
      .execute();
    return productVar;
  }

  async postGuestCommentById(
    id: number,
    addNestedReviewDto: AddNestedReviewDto,
  ) {
    const comment = await this.nestedReviewRepository
      .createQueryBuilder('nestedreview')
      .leftJoinAndSelect('nestedreview.review', 'review')
      .where({ id: id })
      .insert()
      .into(Nestedreview)
      .values(addNestedReviewDto)
      .execute();
    return comment;
  }

  async countCommentbyId(id: number) {
    const comment = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .where({ product: id })
      .getCount();

    const stars5 = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .where({ product: id })
      .andWhere({ stars: 5 })
      .getCount();

    const stars4 = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .where({ product: id })
      .andWhere({ stars: 4 })
      .getCount();

    const stars3 = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .where({ product: id })
      .andWhere({ stars: 3 })
      .getCount();

    const stars2 = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .where({ product: id })
      .andWhere({ stars: 2 })
      .getCount();

    const stars1 = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .where({ product: id })
      .andWhere({ stars: 1 })
      .getCount();
    return [comment, stars5, stars4, stars3, stars2, stars1];
  }

  async getReview(page: number) {
    const review = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.product', 'product')
      .skip(16 * (page - 1))
      .take(16)
      .getMany();

    const count = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .getCount();

    const totalPage = Math.ceil(count / 16);
    return [review, totalPage];
  }

  async getAllreview() {
    const review = await this.reviewRepository.find();
    return review;
  }

  async getReviewByID(id: number) {
    const review = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .where({ id: id })
      .getMany();
    return review;
  }

  async editReviewByID(id: number, addReviewDto: AddReviewDto) {
    const review = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .where({ id: id })
      .update(addReviewDto)
      .execute();
  }

  async deleteReviewByID(id: number) {
    const review = await this.reviewRepository.softDelete({ id: id });
    return review;
  }

  async getNestedReview(page: number) {
    const nestedReview = await this.nestedReviewRepository
      .createQueryBuilder('nestedreview')
      .leftJoinAndSelect('nestedreview.review', 'review')
      .skip(10 * (page - 1))
      .take(10)
      .getMany();

    const count = await this.nestedReviewRepository
      .createQueryBuilder('nestedreview')
      .leftJoinAndSelect('nestedreview.review', 'review')
      .getCount();

    const totalPage = Math.ceil(count / 10);
    return [nestedReview, totalPage];
  }

  async getNestedReviewByID(id: number) {
    const nestedReview = await this.nestedReviewRepository
      .createQueryBuilder('nestedreview')
      .leftJoinAndSelect('nestedreview.review', 'review')
      .where({ id: id })
      .getMany();
    return nestedReview;
  }

  async editNestedReviewByID(
    id: number,
    editNestedReviewDto: editNestedReviewDto,
  ) {
    const nestedReview = await this.nestedReviewRepository
      .createQueryBuilder('nestedreview')
      .leftJoinAndSelect('nestedreview.review', 'review')
      .where({ id: id })
      .update(editNestedReviewDto)
      .execute();
    return nestedReview;
  }

  async deleteNestedReviewByID(id: number) {
    const nestedReview = await this.nestedReviewRepository.softDelete({
      id: id,
    });
    return nestedReview;
  }

  async postCommentById(addReviewDto: AddReviewDto) {
    const comment = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .insert()
      .into(Review)
      .values(addReviewDto)
      .execute();
    return comment;
  }

  async listAllCategory() {
    return await this.categoryRepository.find();
  }

  async searchnestedReview(searchReviewDto: SearchReviewDto) {
    const reviews = await this.nestedReviewRepository
      .createQueryBuilder('nestedreview')
      .leftJoinAndSelect('nestedreview.review', 'review');

    if (searchReviewDto.search === 'searchall') {
      return reviews
        .where(`LOWER(review.id) LIKE '%${searchReviewDto.sortBy}%'`)
        .orWhere(`LOWER(nestedreview.id) LIKE '%${searchReviewDto.sortBy}%'`)
        .take(10)
        .getMany();
    }

    if (searchReviewDto.search === 'adminasc') {
      return reviews
        .orderBy(`review.${searchReviewDto.sortBy}`, 'ASC')
        .getMany();
    }

    if (searchReviewDto.search === 'admindesc') {
      return reviews
        .orderBy(`review.${searchReviewDto.sortBy}`, 'DESC')
        .getMany();
    }
    return reviews.getMany();
  }

  async searchReview(searchReviewDto: SearchReviewDto) {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user');

    if (searchReviewDto.search === 'searchall') {
      return reviews
        .where(`LOWER(review.id) LIKE '%${searchReviewDto.sortBy}%'`)
        .orWhere(`LOWER(review.type) LIKE '%${searchReviewDto.sortBy}%'`)
        .orWhere(`LOWER(user.id) LIKE '%${searchReviewDto.sortBy}%'`)
        .orWhere(`LOWER(product.id) LIKE '%${searchReviewDto.sortBy}%'`)
        .take(10)
        .getMany();
    }

    if (searchReviewDto.search === 'reviewasc') {
      return reviews
        .orderBy(`review.${searchReviewDto.sortBy}`, 'ASC')
        .getMany();
    }

    if (searchReviewDto.search === 'reviewdesc') {
      return reviews
        .orderBy(`review.${searchReviewDto.sortBy}`, 'DESC')
        .getMany();
    }

    if (searchReviewDto.search === 'productasc') {
      return reviews
        .orderBy(`product.${searchReviewDto.sortBy}`, 'ASC')
        .getMany();
    }

    if (searchReviewDto.search === 'productdesc') {
      return reviews
        .orderBy(`product.${searchReviewDto.sortBy}`, 'DESC')
        .getMany();
    }

    if (searchReviewDto.search === 'userasc') {
      return reviews.orderBy(`user.${searchReviewDto.sortBy}`, 'ASC').getMany();
    }

    if (searchReviewDto.search === 'userdesc') {
      return reviews
        .orderBy(`user.${searchReviewDto.sortBy}`, 'DESC')
        .getMany();
    }

    return reviews.getMany();
  }

  async getProductbyCat(searchProductDto: SearchProductDto) {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productvariant', 'productvariant')
      .leftJoinAndSelect('product.discount', 'discount')
      .leftJoinAndSelect('product.review', 'review');

    if (searchProductDto.search === 'searchall') {
      const search = await this.productRepository
        .createQueryBuilder('product')
        .where(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .orWhere(`LOWER(id) LIKE '%${searchProductDto.sortBy}%'`)
        .orWhere(`LOWER(price) LIKE '%${searchProductDto.sortBy}%'`)
        .orWhere(`LOWER(content) LIKE '%${searchProductDto.sortBy}%'`)
        .orWhere(`LOWER(category) LIKE '%${searchProductDto.sortBy}%'`)
        .take(10)
        .getMany();
      return search;
    }

    if (searchProductDto.search === 'adminasc') {
      return products
        .orderBy(`product.${searchProductDto.sortBy}`, 'ASC')
        .getMany();
    }

    if (searchProductDto.search === 'admindesc') {
      return products
        .orderBy(`product.${searchProductDto.sortBy}`, 'DESC')
        .getMany();
    }

    if (searchProductDto.search === 'random') {
      return products.select().orderBy('RAND()').take(18).getMany();
    }

    if (searchProductDto.search === 'danhchoban') {
      return products
        .where({ category: searchProductDto.category })
        .orderBy(`product.price`, 'ASC')
        .getMany();
    }

    if (searchProductDto.search === 'dichvuso') {
      return products
        .where({ category: searchProductDto.category })
        .orderBy(`product.price`, 'ASC')
        .getMany();
    }

    if (searchProductDto.search === 'dealsieuhot') {
      return products
        .where({ category: searchProductDto.category })
        .orderBy(`product.price`, 'ASC')
        .getMany();
    }

    if (searchProductDto.search === 'revodoi') {
      return products
        .where({ category: searchProductDto.category })
        .orderBy(`product.price`, 'ASC')
        .getMany();
    }

    if (searchProductDto.search === 'thoitrang') {
      return products
        .where({ category: searchProductDto.category })
        .orderBy(`product.price`, 'ASC')
        .getMany();
    }

    if (searchProductDto.search === 'trending') {
      return products
        .where({ category: searchProductDto.category })
        .orderBy(`product.price`, 'ASC')
        .getMany();
    }

    if (searchProductDto.search === 'phobien') {
      return products.where({ category: searchProductDto.category }).getMany();
    }

    if (searchProductDto.search === 'asc') {
      return products
        .where({ category: searchProductDto.category })
        .orderBy(`product.${searchProductDto.sortBy}`, 'ASC')
        .getMany();
    }

    if (searchProductDto.search === 'desc') {
      return products
        .where({ category: searchProductDto.category })
        .orderBy(`product.${searchProductDto.sortBy}`, 'DESC')
        .getMany();
    }
    if (searchProductDto.search === 'gia2') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere({ price: MoreThanOrEqual(searchProductDto.fromPrice) })
        .andWhere({ price: LessThanOrEqual(searchProductDto.toPrice) })
        .getMany();
    }

    if (searchProductDto.search === 'gia3') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere({ price: MoreThanOrEqual(searchProductDto.fromPrice) })
        .andWhere({ price: LessThanOrEqual(searchProductDto.toPrice) })
        .getMany();
    }

    if (searchProductDto.search === 'gia4') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere({ price: MoreThanOrEqual(searchProductDto.fromPrice) })
        .andWhere({ price: LessThanOrEqual(searchProductDto.toPrice) })
        .getMany();
    }

    if (searchProductDto.search === 'gia1') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere({ price: MoreThanOrEqual(searchProductDto.fromPrice) })
        .andWhere({ price: LessThanOrEqual(searchProductDto.toPrice) })
        .getMany();
    }

    if (searchProductDto.search === 'danhmuc1') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }

    if (searchProductDto.search === 'danhmuc2') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }

    if (searchProductDto.search === 'danhmuc3') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }

    if (searchProductDto.search === 'danhmuc4') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }

    if (searchProductDto.search === 'danhmuc5') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }

    if (searchProductDto.search === 'danhmuc6') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }
    if (searchProductDto.search === 'danhmuc7') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }
    if (searchProductDto.search === 'danhmuc8') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }
    if (searchProductDto.search === 'danhmuc9') {
      return products
        .where({ category: searchProductDto.category })
        .andWhere(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
        .getMany();
    }
    return products.getMany();
  }

  async adminEditCategory(id: number, editCategory: EditCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    category.category = editCategory.category;
    category.image = editCategory.image;
    category.path = editCategory.path;
    category.parentId = editCategory.parentId;
    const updatedCategory = await this.categoryRepository.save(category);
    return updatedCategory;
  }

  async adminDeleteCategory(id: number) {
    try {
      await this.categoryRepository.delete(id);
    } catch (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('deleted');
      }
    }
  }

  async adminNewCategory(newCategory: NewCategoryDto) {
    return await this.categoryRepository.save(newCategory);
  }

  async listProduct(page: number) {
    const countProducts = await this.productRepository.count();
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categoryID', 'category')
      .skip(18 * (page - 1))
      .take(18)
      .getMany();
    return [products, countProducts];
  }

  async list6Product() {
    const products = await this.productRepository.find({ take: 6 });
    return products;
  }

  async getProductById(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categoryID', 'category')
      .where({ id: id })
      .getMany();
    return product;
  }

  async getByCategory(id: number) {
    const products = await this.categoryRepository.find({
      where: { id: id },
    });
    return products;
  }

  async editProduct(id: number, editProductDto: EditProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    product.category = editProductDto.category;
    product.content = editProductDto.content;
    product.image = editProductDto.image;
    product.price = editProductDto.price;
    product.initialPrice = editProductDto.initialPrice;
    product.productName = editProductDto.productName;
    product.quantity = editProductDto.quantity;
    const updatedProduct = this.productRepository.save(product);
    return updatedProduct;
  }

  async deleteThisProduct(id: number) {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('deleted');
      }
    }
  }

  async adminCheckQty() {
    return await this.productRepository.find({
      where: { quantity: LessThanOrEqual(40) },
    });
  }
}
