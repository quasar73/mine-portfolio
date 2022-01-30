import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/database/entities/message.entity';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {}
}
