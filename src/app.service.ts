import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat/entity/chat.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async createMessage(chat: Chat){
    return await this.chatRepository.save(chat)
  }

  async findAll() {
    const chat = await this.chatRepository.find();
    return chat
  }

  async getChatById (id:string) {
    const chat = await this.chatRepository
    .createQueryBuilder('chat')
    .where({room: id})
    .getMany()
    return chat;
  }
}
