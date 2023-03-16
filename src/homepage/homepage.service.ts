import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EditHeroDto from './dto/editHero.dto';
import { Bosuutap } from './entity/bosuutap';
import { Hero } from './entity/hero';
import { Province } from './entity/Province.entity';
import { Thuonghieuchinhhang } from './entity/thuonghieuchinhhang';
import { Thuonghieusaletet } from './entity/thuonghieusaletet';

@Injectable()
export class HomepageService {
    constructor(
        @InjectRepository(Hero)
        private heroRepository: Repository<Hero>,

        @InjectRepository(Thuonghieuchinhhang)
        private thuonghieuchinhhangRepository: Repository<Thuonghieuchinhhang>,

        @InjectRepository(Thuonghieusaletet)
        private thuonghieusaletetRepository: Repository<Thuonghieusaletet>,

        @InjectRepository(Bosuutap)
        private bosuutapRepository: Repository<Bosuutap>,
        
        @InjectRepository(Province)
        private provinceRepository: Repository<Province>,
    ) { }

    async listHero() {
        return await this.heroRepository.find()
    }

    async getHerobyId (id:number) {
        const hero =await this.heroRepository.findOneBy({id});
        return hero
    }

    async editHero(id: number, editHeroDto:EditHeroDto) {
        const hero = await this.heroRepository.findOneBy({id});
        hero.name = editHeroDto.name;
        hero.image = editHeroDto.image;
        hero.path = editHeroDto.path;
        const updatedHero = this.heroRepository.save(hero);
    return updatedHero;
    }

    async listThuonghieuchinhhang() {
        return await this.thuonghieuchinhhangRepository.find()
    }

    async getChinhhangbyId (id:number) {
        const chinhhang = await this.thuonghieuchinhhangRepository.findOneBy({id});
        return chinhhang;
    }

    async editChinhhang (id: number, editHeroDto:EditHeroDto) {
        const chinhhang = await this.thuonghieuchinhhangRepository.findOneBy({id});
        chinhhang.name = editHeroDto.name;
        chinhhang.image = editHeroDto.image;
        chinhhang.path = editHeroDto.path;
        const updatedChinhhang = this.thuonghieuchinhhangRepository.save(chinhhang);
    return updatedChinhhang;
    }

    async listSaletet() {
        return await this.thuonghieusaletetRepository.find()
    }

    async listBosuutap() {
        return await this.bosuutapRepository.find()
    }

    async getBosuutapbyId(id:number) {
        const bosuutap = await this.bosuutapRepository.findOneBy({id});
        return bosuutap;
    }

    async editBosuutap (id: number, editHeroDto:EditHeroDto) {
        const bosuutap = await this.bosuutapRepository.findOneBy({id});
        bosuutap.name = editHeroDto.name;
        bosuutap.image = editHeroDto.image;
        bosuutap.path = editHeroDto.path;
        const UpdatedBosuutap = this.bosuutapRepository.save(bosuutap);
    return UpdatedBosuutap;
    }

    listProvinces = async () => {
        const provinces = await this.provinceRepository.find();
        return provinces;
    }

    listProvincesName = async (name: string) => {
        const provinces = await this.provinceRepository.findOneBy({ name })
        return provinces;
    }
}
