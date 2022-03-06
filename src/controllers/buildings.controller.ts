import { UpdateBuildingDto } from './../shared/dto/update-building.dto';
import { BuildingsListDto } from './../shared/dto/buildings-list.dto';
import { AddBuildingDto } from './../shared/dto/add-building.dto';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { BuildingsService } from 'src/buildings/buildings.service';
import { BuildingResponseDto } from 'src/shared/dto/building-response.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerGoogleStorage from 'multer-google-storage';
import { DeleteImageDto } from 'src/shared/dto/delete-image.dto';

@ApiTags('Buildings')
@Controller('api/buildings')
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

    @ApiBody({
        type: DeleteImageDto,
    })
    @ApiResponse({
        status: 200,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post('removeimage')
    async daleteImage(@Body() dto: DeleteImageDto) {
        await this.buildingsService.deleteImage(dto);
        return;
    }

    @ApiBody({
        type: DeleteImageDto,
    })
    @ApiResponse({
        status: 200,
        type: [String],
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @UseInterceptors(
        FilesInterceptor('files', null, {
            storage: multerGoogleStorage.storageEngine({
                filename: (req, file, cb) => {
                    const fileNameSplit = file.originalname.split('.');
                    const fileExt = fileNameSplit[fileNameSplit.length - 1];
                    cb(null, `${Date.now()}.${fileExt}`);
                },
            }),
        }),
    )
    @Post(':id')
    async addImages(
        @Param('id') id: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        const imagesPath = await this.buildingsService.processImages(files);
        const images = await this.buildingsService.addImages(id, imagesPath);
        return images;
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

    @ApiResponse({
        type: [BuildingsListDto],
        status: 200,
    })
    @HttpCode(200)
    @Get('featured')
    async getFeaturedBuildins() {
        const buildings =
            await this.buildingsService.getFeaturedBuildingsList();
        return buildings;
    }

    @ApiResponse({
        type: BuildingResponseDto,
        status: 200,
    })
    @HttpCode(200)
    @Get(':id')
    async getBuilding(@Param('id') id: string) {
        const building = await this.buildingsService.getBuildingById(id);
        return building;
    }

    @ApiResponse({
        type: BuildingResponseDto,
        status: 200,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Put()
    async updateBuilding(@Body() dto: UpdateBuildingDto) {
        const building = await this.buildingsService.updateBuilding(dto);
        return building;
    }

    @ApiResponse({
        type: [String],
        status: 200,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FilesInterceptor('previews', null, {
            storage: multerGoogleStorage.storageEngine({
                filename: (req, file, cb) => {
                    const fileNameSplit = file.originalname.split('.');
                    const fileExt = fileNameSplit[fileNameSplit.length - 1];
                    cb(null, `${Date.now()}.${fileExt}`);
                },
            }),
        }),
    )
    @HttpCode(200)
    @Put('preview/:id')
    async changePreview(
        @Param('id') id: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        const imagesPath = await this.buildingsService.processImages(files);
        await this.buildingsService.changePreview(id, imagesPath);
        return imagesPath;
    }

    @ApiResponse({
        status: 200,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Delete(':id')
    async daleteBuilding(@Param('id') id: string) {
        await this.buildingsService.deleteBuilding(id);
        return;
    }
}
