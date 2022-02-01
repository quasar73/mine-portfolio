import { UpdateMessageDto } from './../shared/dto/update-message.dto';
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
            id: message.id.toHexString(),
        };
    }

    async getMessages(): Promise<MessageResponseDto[]> {
        return (await this.messageRepository.find()).map((m) => {
            return { ...m, id: m.id.toHexString() };
        });
    }

    async updateMessage(updateMessageDto: UpdateMessageDto): Promise<void> {
        const message = await this.messageRepository.findOne(
            updateMessageDto.id,
        );
        await this.messageRepository.save({
            ...message,
            seen: updateMessageDto.seen,
        });

        return;
    }
}
