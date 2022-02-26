import { GetBuildingDto } from './../../client/src/app/shared/dto/get-building.dto';
import { UpdateBuildingDto } from './../shared/dto/update-building.dto';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from '@firebase/app';
import { BuildingsListDto } from './../shared/dto/buildings-list.dto';
import { AddBuildingDto } from './../shared/dto/add-building.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Building } from 'src/database/entities/building.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingResponseDto } from 'src/shared/dto/building-response.dto';
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
} from '@firebase/storage';

@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(Building)
        private buildingsRepository: Repository<Building>,
        private configService: ConfigService,
    ) {}

    async addBuilding(
        addBuildingDto: AddBuildingDto,
        imagesPath: string[],
    ): Promise<BuildingResponseDto> {
        const building = Building.create({
            ...addBuildingDto,
            featured: addBuildingDto.featured === 'true',
            preview: imagesPath[0],
            minimizedPreview: imagesPath[1],
            images: [...imagesPath.slice(2, imagesPath.length)],
        });
        await building.save();

        return {
            ...building,
            id: building.id.toHexString(),
        };
    }

    async getBuildingsList(): Promise<BuildingsListDto[]> {
        const buildings = await this.buildingsRepository.find();

        return buildings.map((b) => {
            return {
                id: b.id.toHexString(),
                title: b.title,
                featured: b.featured,
                preview: b.preview,
                minimizedPreview: b.minimizedPreview,
            };
        });
    }

    async processImages(files: Express.Multer.File[]): Promise<string[]> {
        const app = initializeApp({
            apiKey: this.configService.get<string>('FIREBASE_KEY'),
            storageBucket: this.configService.get<string>('BUCKET'),
        });
        const storage = getStorage(app);

        const imagesPath = Promise.all(
            files.map(async (f) => {
                return await getDownloadURL(
                    ref(
                        storage,
                        `${this.configService.get<string>('BUCKET')}/${
                            f.filename
                        }`,
                    ),
                );
            }),
        );

        return imagesPath;
    }

    async getBuildingById(id: string): Promise<BuildingResponseDto> {
        const building = await this.buildingsRepository.findOne(id);
        return {
            ...building,
            id: building.id.toHexString(),
        };
    }

    async getFeaturedBuildingsList(): Promise<BuildingsListDto[]> {
        const buildings = await this.buildingsRepository.find({
            featured: true,
        });

        return buildings.map((b) => {
            return {
                id: b.id.toHexString(),
                title: b.title,
                featured: b.featured,
                preview: b.preview,
                minimizedPreview: b.minimizedPreview,
            };
        });
    }

    async updateBuilding(dto: UpdateBuildingDto): Promise<any> {
        const building = await this.buildingsRepository.findOne(dto.id);
        const { id, ...updateData } = dto;
        await this.buildingsRepository.save({
            id: dto.id,
            ...building,
            ...updateData,
        });

        return;
    }

    async deleteBuilding(id: string): Promise<any> {
        const building = await this.buildingsRepository.findOne(id);
        await this.deleteImages([
            building.preview,
            building.minimizedPreview,
            ...building.images,
        ]);
        await this.buildingsRepository.delete(id);

        return;
    }

    async changePreview(id: string, imagesPath: string[]): Promise<void> {
        const building = await this.buildingsRepository.findOne(id);
        await this.deleteImages([building.preview, building.minimizedPreview]);

        await this.buildingsRepository.save({
            id: id,
            ...building,
            preview: imagesPath[0],
            minimizedPreview: imagesPath[1],
        });

        return;
    }

    private async getNameFormPath(path: string): Promise<string> {
        const parts = path.split('/');
        return parts[parts.length - 1].split('?')[0];
    }

    private async deleteImages(imagesPath: string[]): Promise<void> {
        const app = initializeApp({
            apiKey: this.configService.get<string>('FIREBASE_KEY'),
            storageBucket: this.configService.get<string>('BUCKET'),
        });
        const storage = getStorage(app);

        for (const path of imagesPath) {
            const imageRef = ref(storage, await this.getNameFormPath(path));
            await deleteObject(imageRef);
        }

        return;
    }
}
