import { GetBuildingDto } from './../../shared/dto/get-building.dto';
import { BuildingsService } from './../../shared/services/buildings/buildings.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mbp-building-page',
    templateUrl: './building-page.component.html',
    styleUrls: ['./building-page.component.scss'],
})
export class BuildingPageComponent implements OnInit {
    id = '';
    building!: GetBuildingDto;
    index = 0;

    constructor(
        private route: ActivatedRoute,
        private buildingsService: BuildingsService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap) => {
            this.id = paramMap.get('id') ?? '';

            this.buildingsService.getBuilding(this.id).subscribe((result) => {
                if (result) {
                    this.building = result;
                }
            });
        });
    }
}
