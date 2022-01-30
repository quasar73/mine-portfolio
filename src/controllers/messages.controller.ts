import { MessagesService } from './../messages/messages.service';
import { AddMessageDto } from './../shared/dto/add-message.dto';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @ApiBody({
        type: [AddMessageDto],
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Post()
    async addMessage(@Body() addMessageDto: AddMessageDto) {
        return await this.messagesService.addMessage(addMessageDto);
    }
}
