import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entity/chat.entity';

@Injectable()
export class ChatService {
constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
){}


}
