import { AuthModule } from './auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './env/.dev.env',
        }),
        AuthModule,
    ],
    controllers: [AuthController],
    providers: [],
})
export class AppModule {}
