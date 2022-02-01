import { Building } from './../database/entities/building.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from 'src/controllers/buildings.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Building])],
    providers: [BuildingsService],
    controllers: [BuildingsController],
})
export class BuildingsModule {}
