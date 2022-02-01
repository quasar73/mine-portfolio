import { AddBuildingDto } from './../shared/dto/add-building.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Building } from 'src/database/entities/building.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingResponseDto } from 'src/shared/dto/building-response.dto';

@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(Building)
        private buildingsRepository: Repository<Building>,
    ) {}

    async addBuilding(
        addBuildingDto: AddBuildingDto,
        imagesPath: string[],
    ): Promise<BuildingResponseDto> {
        const building = Building.create({
            ...addBuildingDto,
            images: [...imagesPath],
        });
        await building.save();

        return {
            ...building,
            id: building.id.toHexString(),
        };
    }
}
