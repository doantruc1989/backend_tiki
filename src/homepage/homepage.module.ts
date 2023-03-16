import { Module } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './entity/hero';
import { Bosuutap } from './entity/bosuutap';
import { Thuonghieuchinhhang } from './entity/thuonghieuchinhhang';
import { Thuonghieusaletet } from './entity/thuonghieusaletet';
import { Province } from './entity/Province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero,Bosuutap,Thuonghieuchinhhang,Thuonghieusaletet, Province])],
  providers: [HomepageService],
  controllers: [HomepageController]
})
export class HomepageModule {}
