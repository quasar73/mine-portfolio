import { GetBuildingDto } from './../../../../../shared/dto/get-building.dto';
import { BuildingsService } from './../../../../../shared/services/buildings/buildings.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { UpdateBuildingModel } from 'src/app/shared/models/update-building.model';

@Component({
    selector: 'mbp-works-list-item',
    templateUrl: './works-list-item.component.html',
    styleUrls: ['./works-list-item.component.scss'],
})
export class WorksListItemComponent implements OnChanges {
    @Input() buldingId!: string;

    @Output() updated = new EventEmitter<UpdateBuildingModel>();

    buildingForm = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        featured: new FormControl(false),
    });
    building!: GetBuildingDto;

    constructor(
        private buildingsService: BuildingsService,
        private notificationsService: TuiNotificationsService
    ) {}

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

    save(): void {
        const dto = {
            id: this.buldingId,
            ...this.buildingForm.value,
        };

        this.buildingsService.updateBuildings(dto).subscribe(() => {
            this.notificationsService
                .show(`Данные о рабооте "${dto.title}" были успешно изменены`, {
                    label: 'Работа успешно обновлена!',
                    status: TuiNotification.Success,
                })
                .subscribe();

            this.updated.emit({
                id: dto.id,
                title: dto.title,
                featured: dto.featured,
            });
        });
    }
}
