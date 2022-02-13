import { BuildingsService } from './../../shared/services/buildings/buildings.service';
import { GetBuildingsDto } from 'src/app/shared/dto/get-buildings.dto';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mbp-portfolio-page',
    templateUrl: './portfolio-page.component.html',
    styleUrls: ['./portfolio-page.component.scss'],
})
export class PortfolioPageComponent implements OnInit {
    buildings: GetBuildingsDto[] = [];

    constructor(private buildingsService: BuildingsService) {}

    ngOnInit(): void {
        this.buildingsService.getBuildings().subscribe((buildings) => {
            this.buildings = buildings ?? [];
        });
    }
}
