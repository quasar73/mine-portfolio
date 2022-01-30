import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MessagesModule } from './messages/messages.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './env/.dev.env',
        }),
        AuthModule,
        DatabaseModule,
        MessagesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
