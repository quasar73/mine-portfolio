import { BuildingsListDto } from './../shared/dto/buildings-list.dto';
import { AddBuildingDto } from './../shared/dto/add-building.dto';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { BuildingsService } from 'src/buildings/buildings.service';
import { BuildingResponseDto } from 'src/shared/dto/building-response.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerGoogleStorage from 'multer-google-storage';

@ApiTags('Buildings')
@Controller('buildings')
export class BuildingsController {
    constructor(private buildingsService: BuildingsService) {}

    @ApiBody({
        type: AddBuildingDto,
    })
    @ApiBearerAuth()
    @ApiResponse({
        type: BuildingResponseDto,
        status: 201,
    })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FilesInterceptor('files', null, {
            storage: multerGoogleStorage.storageEngine({
                projectId: process.env.FIREBASE_PROJECT_ID,
                keyFilename: './env/storage-keys.json',
                bucket: process.env.BUCKET,
                filename: (req, file, cb) => {
                    const fileNameSplit = file.originalname.split('.');
                    const fileExt = fileNameSplit[fileNameSplit.length - 1];
                    cb(null, `${Date.now()}.${fileExt}`);
                },
            }),
        }),
    )
    @HttpCode(201)
    @Post()
    async addBuilding(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() addBuildingDto: AddBuildingDto,
    ) {
        const imagesPath = await this.buildingsService.processImages(files);
        const building = await this.buildingsService.addBuilding(
            addBuildingDto,
            imagesPath,
        );
        return building;
    }

    @ApiResponse({
        type: [BuildingsListDto],
        status: 200,
    })
    @HttpCode(200)
    @Get()
    async getBuildingsList() {
        const buildings = await this.buildingsService.getBuildingsList();
        return buildings;
    }
}
