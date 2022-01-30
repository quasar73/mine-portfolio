import { AddMessageDto } from './../shared/dto/add-message.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/database/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {}

    async addMessage(addMessageDto: AddMessageDto): Promise<Message> {
        const message = Message.create({
            ...addMessageDto,
        });
        await message.save();

        return message;
    }
}
