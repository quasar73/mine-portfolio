import { UpdateBuildingModel } from './../../../../shared/models/update-building.model';
import { GetBuildingsDto } from './../../../../shared/dto/get-buildings.dto';
import { BuildingsService } from './../../../../shared/services/buildings/buildings.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mbp-works-accordion',
    templateUrl: './works-accordion.component.html',
    styleUrls: ['./works-accordion.component.scss'],
})
export class WorksAccordionComponent implements OnInit {
    buildings: GetBuildingsDto[] = [];

    constructor(private buildingsService: BuildingsService) {}

    ngOnInit(): void {
        this.buildingsService.getBuildings().subscribe((buildings) => {
            this.buildings = buildings ?? [];
        });
    }

    onUpdated(updated: UpdateBuildingModel): void {
        const index = this.buildings.findIndex((b) => b.id === updated.id);
        if (index >= 0) {
            this.buildings[index].title = updated.title;
            this.buildings[index].featured = updated.featured;
        }
    }
}
