import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private readonly appService: AppService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('/allchat')
  async Home() {
    return this.appService.findAll();
  }

  @Get('/chat/:id')
  async getChatId (@Param('id') id: string) {
    return await this.appService.getChatById(id)
  }
}
