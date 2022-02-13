import { BuildingsService } from './../../../../shared/services/buildings/buildings.service';
import { Component, OnInit } from '@angular/core';
import { GetBuildingsDto } from 'src/app/shared/dto/get-buildings.dto';

@Component({
    selector: 'mbp-featured-work',
    templateUrl: './featured-work.component.html',
    styleUrls: ['./featured-work.component.scss'],
})
export class FeaturedWorkComponent implements OnInit {
    index = 0;
    buildings: GetBuildingsDto[] = [];

    constructor(private buildingsService: BuildingsService) {}

    ngOnInit(): void {
        this.buildingsService.getFeaturedBuildings().subscribe((buildings) => {
            this.buildings = buildings ?? [];
        });
    }
}
