import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from 'src/controllers/auth.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './env/.dev.env',
        }),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
