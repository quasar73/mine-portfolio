import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MessagesModule } from './messages/messages.module';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './env/.dev.env',
        }),
        AuthModule,
        DatabaseModule,
        MessagesModule,
        BuildingsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
