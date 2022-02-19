import { GetBuildingDto } from './../../../../../shared/dto/get-building.dto';
import { BuildingsService } from './../../../../../shared/services/buildings/buildings.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'mbp-works-list-item',
    templateUrl: './works-list-item.component.html',
    styleUrls: ['./works-list-item.component.scss'],
})
export class WorksListItemComponent implements OnChanges {
    @Input() buldingId!: string;

    buildingForm = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        featured: new FormControl(false),
    });
    building!: GetBuildingDto;

    constructor(private buildingsService: BuildingsService) {}

    ngOnChanges(): void {
        if (this.buldingId) {
            this.buildingsService.getBuilding(this.buldingId).subscribe((building) => {
                if (building) {
                    this.building = building;
                    this.buildingForm.setValue({
                        title: this.building.title,
                        description: this.building.description,
                        featured: this.building.featured,
                    });
                }
            });
        }
    }
}
