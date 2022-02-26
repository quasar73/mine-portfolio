import { SettingsController } from './../controllers/settings.controller';
import { Setting } from './../database/entities/setting.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsService } from './settings.service';

@Module({
    imports: [TypeOrmModule.forFeature([Setting])],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule {}
