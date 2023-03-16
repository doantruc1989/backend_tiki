import {
  Body,
  CacheInterceptor,
  CacheTTL,
  CACHE_MANAGER,

  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import AddNestedReviewDto from './dto/addNestedReview.dto';
import AddReviewDto from './dto/addReview.dto';
import EditCategoryDto from './dto/editCategory.tdo';
import editNestedReviewDto from './dto/editNestedReview.dto';
import EditProductDto from './dto/editProduct.dto';
import EditProVariantdto from './dto/editProVariant.dto';
import NewCategoryDto from './dto/newCategory.dto';
import NewProductDto from './dto/newProduct.dto';
import NewProductVarDto from './dto/newProductVar.dto';
import SearchProductDto from './dto/searchProduct.dto';
import SearchReviewDto from './dto/searchReview.dto';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';

@Controller()
@ApiTags('Product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
  @Get('product')
  async getAllProduct(@Query('page') page: number) {
    return this.productService.listProduct(page);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/product/:id')
  async getProductId(@Param('id') id: number) {
    return this.productService.getProductByIdV2(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/productvariant/:id')
  async getProductVarId(@Param('id') id: number) {
    return this.productService.getProductVarByIdV2(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('v2/productvariant/:id')
  async postProducVariant(
    @Param('id') id: number,
    @Body() editProVariantdto: EditProVariantdto,
  ) {
    return this.productService.editProductVarByIdV2(id, editProVariantdto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('v2/newproductvariant')
  async createNewProductVar(@Body() newProductVarDto: NewProductVarDto) {
    return this.productService.createProductVar(newProductVarDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Delete('v2/productvariant/:id')
  async deleteProductVariant(@Param('id') id: number) {
    return this.productService.deleteProductVariantById(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('v2/product/comment/')
  async postComment(@Body() addReviewDto: AddReviewDto) {
    return this.productService.postCommentById(addReviewDto);
  }

  // @Get('v2/product/comment/:id')
  // async getComment(@Param('id') id: number) {
  //   return this.productService.getCommentById(id)
  // }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('v2/product/guestcomment/:id')
  async postGuestComment(
    @Param('id') id: number,
    @Body() addNestedReviewDto: AddNestedReviewDto,
  ) {
    return this.productService.postGuestCommentById(id, addNestedReviewDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/review')
  async getReview(@Query('page') page: number) {
    return this.productService.getReview(page);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/allreview')
  async getAllReview() {
    return this.productService.getAllreview()
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/review/:id')
  async getReviewByid(@Param('id') id: number) {
    return this.productService.getReviewByID(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Patch('v2/review/:id')
  async editReviewById(
    @Param('id') id: number,
    @Body() addReviewDto: AddReviewDto,
  ) {
    return this.productService.editReviewByID(id, addReviewDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Delete('v2/review/:id')
  async deleteReviewByid(@Param('id') id: number) {
    return this.productService.deleteReviewByID(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/nestedreview')
  async getNestedReview(@Query('page') page: number) {
    return this.productService.getNestedReview(page);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/nestedreview/:id')
  async getNestedReviewByid(@Param('id') id: number) {
    return this.productService.getNestedReviewByID(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Patch('v2/nestedreview/:id')
  async editNestedReviewById(
    @Param('id') id: number,
    @Body() editNestedReviewDto: editNestedReviewDto,
  ) {
    return this.productService.editNestedReviewByID(id, editNestedReviewDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Delete('v2/nestedreview/:id')
  async deleteNestedReviewByid(@Param('id') id: number) {
    return this.productService.deleteNestedReviewByID(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/searchnestedreview')
  async searchNestedReview(@Query() searchReviewDto: SearchReviewDto) {
    return this.productService.searchnestedReview(searchReviewDto)
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/searchreview')
  async searchReview(@Query() searchReviewDto: SearchReviewDto) {
    return this.productService.searchReview(searchReviewDto)
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/product/comment/:id')
  async countComment(@Param('id') id: number) {
    return this.productService.countCommentbyId(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('v2/product/')
  async getProductV2(@Query('page') page: number) {
    return this.productService.getAllProduct(page);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Patch('v2/product/:id')
  async patchProductv2(
    @Param('id') id: number,
    @Body() editProductDto: EditProductDto,
  ) {
    return this.productService.patchProductById(id, editProductDto);
  }


  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('product/all')
  async getProductwithCat(@Query() searchProductDto: SearchProductDto) {
    return this.productService.getProductbyCat(searchProductDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('product/createNewProduct')
  async createNewProduct(@Body() newProductDto: NewProductDto) {
    return this.productService.createProduct(newProductDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('product/:id')
  async getProduct(@Param('id') id: any) {
    return this.productService.getProductById(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('category/:id')
  async getProductByCategory(@Param('id') id: number) {
    return this.productService.getByCategory(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('listcategory')
  async listCategory() {
    return this.productService.listAllCategory();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('category/:id')
  async editCategory(
    @Param('id') id: number,
    @Body() editCategory: EditCategoryDto,
  ) {
    return this.productService.adminEditCategory(id, editCategory);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Delete('category/:id')
  async deleteCategory(@Param('id') id: number) {
    return this.productService.adminDeleteCategory(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('newcategory')
  async newCategory(@Body() newCategory: NewCategoryDto) {
    return this.productService.adminNewCategory(newCategory);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('getSixproduct')
  async get6Product() {
    return this.productService.list6Product();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('product/:id')
  async editProduct(
    @Param('id') id: number,
    @Body() editProductDto: EditProductDto,
  ) {
    return this.productService.editProduct(id, editProductDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Delete('product/:id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteThisProduct(id);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('lowquantity')
  async checkQty() {
    return this.productService.adminCheckQty();
  }
}
