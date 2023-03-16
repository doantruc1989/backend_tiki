import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUsersDto } from './dto/searchUsers.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { updateUserPwDto } from './dto/updateUserPw.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ForgetPwdDto } from './dto/forgetPwd.dto';
import { CreateNewPwdDto } from './dto/createNewPwd.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectQueue('send-mail')
    private queueService: Queue,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll(page = 1) {
    return this.usersRepository.find({
      skip: 5 * (page - 1),
      take: 5,
    });
  }

  async getCountUser() {
    const countUser = this.usersRepository.count();
    return countUser;
  }

  async findById(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email: email });
    return user;
  }

  async updateuser(id: number, updateUserDto: UpdateUserDto) {

    return this.usersRepository.update(id, updateUserDto);
  }

  async updatePW(id: number, updateUserPwDto: updateUserPwDto) {
    const user = await this.usersRepository.findOneBy({ id });
    const hashPw = await bcrypt.hash(updateUserPwDto.password, 10);
    user.password = hashPw;
    return this.usersRepository.update(id, user);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async querySearchUsers(searchUsersDto: SearchUsersDto) {
    const users = await this.usersRepository.createQueryBuilder('User');

    if (searchUsersDto.search === 'adminasc') {
      return users.orderBy(`User.${searchUsersDto.sortBy}`, 'ASC').getMany();
    }

    if (searchUsersDto.search === 'admindesc') {
      return users.orderBy(`User.${searchUsersDto.sortBy}`, 'DESC').getMany();
    }

    if (searchUsersDto.search === 'searchall') {
      return users
        .where(`LOWER(email) LIKE '%${searchUsersDto.sortBy}%'`)
        .orWhere(`LOWER(username) LIKE '%${searchUsersDto.sortBy}%'`)
        .orWhere(`LOWER(role) LIKE '%${searchUsersDto.sortBy}%'`)
        .getMany();
    }

    return users.getMany();
  }

  async sendEmailForgotPassword(forgetPwdDto: ForgetPwdDto) {
    var userFromDb = await this.usersRepository
      .createQueryBuilder('users')
      .where({ email: forgetPwdDto.email })
      .getMany();

    if (!userFromDb)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    await this.queueService.add('register', {
      id: userFromDb[0].id,
      to: forgetPwdDto.email,
      name: 'ma.quy1987@gmail.com',
    },
    {
      removeOnComplete: true,
      removeOnFail:true,
    },);

    return HttpStatus.OK
  }

  async createNewPwd(createNewPwdDto:CreateNewPwdDto) {
    console.log(createNewPwdDto);
    const hashPw = await bcrypt.hash(createNewPwdDto.password, 10);
    const user = await this.usersRepository
    .createQueryBuilder('user')
    .where({ id: createNewPwdDto.id })
    .update({password:hashPw})
    .execute();
    return user;
  }
}
