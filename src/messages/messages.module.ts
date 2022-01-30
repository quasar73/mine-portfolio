import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from 'src/controllers/messages.controller';
import { Message } from 'src/database/entities/message.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [MessagesController],
})
export class MessagesModule {}
