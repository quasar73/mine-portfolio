import { Setting } from './../database/entities/setting.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSettingDto } from 'src/shared/dto/add-setting.dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Setting)
        private settingsRepository: Repository<Setting>,
    ) {}

    async getSetting(key: string): Promise<string> {
        const setting = await this.settingsRepository.findOne({ key });
        if (setting) {
            return setting.value;
        } else {
            throw new NotFoundException();
        }
    }

    async getManySettings(keys: string[]): Promise<any> {
        const result = {};
        for (const key of keys) {
            const setting = await this.settingsRepository.findOne({ key });
            result[key] = setting?.value;
        }

        return result;
    }

    async addSetting(dto: AddSettingDto): Promise<AddSettingDto> {
        const setting = await Setting.create({
            ...dto,
        });
        await setting.save();

        const { id, ...settingData } = setting;

        return settingData;
    }
}
