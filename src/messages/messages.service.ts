import { MessageResponseDto } from './../shared/dto/message-response.dto';
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

    async addMessage(
        addMessageDto: AddMessageDto,
    ): Promise<MessageResponseDto> {
        const message = Message.create({
            ...addMessageDto,
            seen: false,
            date: new Date(),
        });
        await message.save();

        return {
            ...message,
            id: message.id.toString(),
        };
    }
}
