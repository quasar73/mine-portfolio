import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MessagesModule } from './messages/messages.module';
import { BuildingsModule } from './buildings/buildings.module';
import { SettingsModule } from './settings/settings.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['./env/.dev.env', '.env'],
            isGlobal: true,
        }),
        AuthModule,
        DatabaseModule,
        MessagesModule,
        BuildingsModule,
        SettingsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
