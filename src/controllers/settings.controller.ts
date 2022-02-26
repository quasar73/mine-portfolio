import { SettingsService } from './../settings/settings.service';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import {
    Controller,
    Get,
    HttpCode,
    Query,
    Post,
    UseGuards,
    Body,
    Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AddSettingDto } from 'src/shared/dto/add-setting.dto';
import { GetSettingDto } from 'src/shared/dto/get-setting.dto';

@ApiTags('Settings')
@Controller('api/settings')
export class SettingsController {
    constructor(private settingsService: SettingsService) {}

    @ApiResponse({
        type: GetSettingDto,
        status: 200,
    })
    @HttpCode(200)
    @Get()
    async getSetting(@Query('key') key: string) {
        const value = await this.settingsService.getSetting(key);
        return { value };
    }

    @ApiResponse({
        status: 200,
    })
    @HttpCode(200)
    @Get('many')
    async getManySetting(@Query('keys') keys: string[]) {
        const result = await this.settingsService.getManySettings(keys);
        return result;
    }

    @ApiBody({
        type: AddSettingDto,
    })
    @ApiBearerAuth()
    @ApiResponse({
        type: AddSettingDto,
        status: 200,
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post()
    async addSetting(@Body() dto: AddSettingDto) {
        const setting = await this.settingsService.addSetting(dto);
        return setting;
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Put()
    async updateSettings(@Body() dto: any) {
        await this.settingsService.updateSettings(dto);
        return;
    }
}
