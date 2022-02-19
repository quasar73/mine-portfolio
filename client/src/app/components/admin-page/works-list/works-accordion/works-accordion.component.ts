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
}
