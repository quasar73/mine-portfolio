import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AuthDto } from 'src/shared/dto/auth.dto';
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

    @ApiBody({
        type: AuthDto,
    })
    @Get('')
    async test() {
        const message = this.messageRepository.create({
            message: '123',
            discord: 'testdis',
        });
        const messageEntity = Message.create(message);
        await messageEntity.save();

        return messageEntity;
    }
}
