import { UpdateMessageDto } from './../shared/dto/update-message.dto';
import { MessageResponseDto } from './../shared/dto/message-response.dto';
import { MessagesService } from './../messages/messages.service';
import { AddMessageDto } from './../shared/dto/add-message.dto';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @ApiBearerAuth()
    @ApiBody({
        type: AddMessageDto,
    })
    @ApiResponse({
        type: MessageResponseDto,
        status: 201,
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Post()
    async addMessage(@Body() addMessageDto: AddMessageDto) {
        const message = await this.messagesService.addMessage(addMessageDto);
        return message;
    }

    @ApiBearerAuth()
    @ApiResponse({
        type: [MessageResponseDto],
        status: 200,
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get()
    async getMessages() {
        const messages = await this.messagesService.getMessages();
        return messages;
    }

    @ApiBearerAuth()
    @ApiResponse({
        type: UpdateMessageDto,
        status: 200,
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Put()
    async updateMessage(@Body() updateMessageDto: UpdateMessageDto) {
        await this.messagesService.updateMessage(updateMessageDto);
        return 'Successfully updated';
    }
}
