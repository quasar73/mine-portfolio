import { ConfigService } from '@nestjs/config';
import { initializeApp } from '@firebase/app';
import { BuildingsListDto } from './../shared/dto/buildings-list.dto';
import { AddBuildingDto } from './../shared/dto/add-building.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Building } from 'src/database/entities/building.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingResponseDto } from 'src/shared/dto/building-response.dto';
import { getDownloadURL, getStorage, ref } from '@firebase/storage';

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
            featured: false,
            images: [...imagesPath],
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
                image: b.images[0],
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
                image: b.images[0],
            };
        });
    }
}
