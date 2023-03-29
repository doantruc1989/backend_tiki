import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import SaveOrderdto from './dto/saveOrder.dto';
import { SearchCartDto } from './dto/searchCart.dto';
import { Cache } from 'cache-manager';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
  @Post('orderitem')
  async saveOrderItem(@Body() saveOrderdto: SaveOrderdto) {
    return this.cartService.saveOrder(saveOrderdto);
  }

  
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(1000)
  @Get('admin/listorder')
  async listorder(@Query('page') page: number) {
    return this.cartService.getListOrder(page);
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('admin/listorder/search')
  querySearch(@Query() searchCartDto:SearchCartDto) {
    return this.cartService.querySearchOrder(searchCartDto)
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('admin/listorder/:id')
  async getOrderById(@Param('id') id: number) {
    return this.cartService.getorderByid(id);
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Patch('admin/listorder/:id')
  async updateOrder(@Param('id') id: number, @Body() saveOrderdto: SaveOrderdto) {
    return this.cartService.updateOrderByid(id, saveOrderdto);
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Delete('admin/listorder/:id')
  async deleteById(@Param('id') id: number) {
    return this.cartService.deletebyId(id);
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('admin/order/:id')
  async listorderbyId(@Param('id') id: number) {
    const result = await this.cartService.getListOrderbyId(id);
    return result;
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('admin/day')
  async getSaleRevenueDay() {
    return this.cartService.adminGetDay();
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('admin/week')
  async getSaleRevenueWeek() {
    return this.cartService.adminGetWeek();
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('admin/month')
  async getSaleRevenueMonth() {
    return this.cartService.adminGetMonth();
  }

//   @Get('admin/countorders/:field')
//   async getTotalOrder(@Param('field') field: number) {
//     return this.cartService.adminTotalOrder(field);
//   }


@UseInterceptors(CacheInterceptor)
@CacheTTL(1000)
  @Get('admin/checkstatus')
  async checkStatus() {
    return this.cartService.checkStatusOrder();
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('/total')
  getcountUser() {
    return this.cartService.getCountOrder();
  }
}
