import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import EditHeroDto from './dto/editHero.dto';
import { HomepageService } from './homepage.service';
import { Cache } from 'cache-manager';

@Controller('homepage')
@ApiTags('homepage')
export class HomepageController {
    constructor(private homepageService: HomepageService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        
        ) { }

        @UseInterceptors(CacheInterceptor)
        @CacheTTL(1000)
    @Get('hero')
    async getHero() {
        return this.homepageService.listHero()
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Get('hero/:id')
    async getHeroById(@Param('id') id: number) {
        return this.homepageService.getHerobyId(id)
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Patch('hero/:id')
    async patchHero(@Param('id') id: number, @Body()editHeroDto:EditHeroDto) {
        return this.homepageService.editHero(id, editHeroDto)
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Get('chinhhang')
    async getThuonghieuchinhhang() {
        return this.homepageService.listThuonghieuchinhhang()
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Get('chinhhang/:id')
    async getChinhhangById(@Param('id') id: number) {
        return this.homepageService.getChinhhangbyId(id)
    }b

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Patch('chinhhang/:id')
    async patchChinhHang(@Param('id') id: number, @Body()editHeroDto:EditHeroDto) {
        return this.homepageService.editChinhhang(id, editHeroDto)
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Get('saletet')
    async getSaletet() {
        return this.homepageService.listSaletet()
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Get('bosuutap')
    async getBosuutap() {
        return this.homepageService.listBosuutap()
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Get('bosuutap/:id')
    async getBosuutapById(@Param('id') id:number) {
        return this.homepageService.getBosuutapbyId(id)
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Patch('bosuutap/:id')
    async patchBosuutap(@Param('id') id: number, @Body()editHeroDto:EditHeroDto) {
        return this.homepageService.editBosuutap(id, editHeroDto)
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(1000)
    @Get('provinces')
    async getProvinces() {
        return this.homepageService.listProvinces()
    }

    @Get('provinces/:name')
    async getProvincesName(@Param('name') name: string) {
        return this.homepageService.listProvincesName(name)
    }
}
