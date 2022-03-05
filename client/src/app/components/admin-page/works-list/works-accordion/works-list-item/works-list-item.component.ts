import { UnsavedModel } from './../../../../../shared/models/unsaved.model';
import { GetBuildingDto } from './../../../../../shared/dto/get-building.dto';
import { BuildingsService } from './../../../../../shared/services/buildings/buildings.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
import {
    TuiDialogContext,
    TuiDialogService,
    TuiNotification,
    TuiNotificationsService,
} from '@taiga-ui/core';
import { UpdateBuildingModel } from 'src/app/shared/models/update-building.model';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import * as md5 from 'md5';
import { compressUtility } from 'src/app/shared/utils/compress.utility';

@Component({
    selector: 'mbp-works-list-item',
    templateUrl: './works-list-item.component.html',
    styleUrls: ['./works-list-item.component.scss'],
})
export class WorksListItemComponent implements OnChanges {
    @Input() buldingId!: string;

    @Output() updated = new EventEmitter<UpdateBuildingModel>();
    @Output() deleted = new EventEmitter<string>();
    @Output() unsaved = new EventEmitter<UnsavedModel>();

    buildingForm = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        featured: new FormControl(false),
    });

    building!: GetBuildingDto;
    formHash!: string;
    pending = true;
    saveEnabled = false;
    imagePending!: boolean;
    preview!: File | null;

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
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
                this.pending = false;
            });
        }

        this.buildingForm.valueChanges.subscribe((res) => {
            if (this.formHash) {
                this.saveEnabled = this.formHash !== md5(JSON.stringify(res));
            } else {
                this.formHash = md5(JSON.stringify(res));
            }
            this.unsaved.emit({
                id: this.buldingId,
                isUnsaved: this.saveEnabled,
            });
        });
    }

    save(): void {
        const dto = {
            id: this.buldingId,
            ...this.buildingForm.value,
        };
        this.pending = true;

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

            this.pending = false;
            this.saveEnabled = false;
            this.formHash = md5(JSON.stringify(this.buildingForm.value));
            this.unsaved.emit({
                id: this.buldingId,
                isUnsaved: this.saveEnabled,
            });
        });
    }

    remove(): void {
        this.pending = true;
        this.buildingsService.removeBuilding(this.buldingId).subscribe(() => {
            this.notificationsService
                .show(`Данные о рабооте "${this.building.title}" были удалены`, {
                    label: 'Работа успешно удалена!',
                    status: TuiNotification.Success,
                })
                .subscribe();

            this.deleted.emit(this.buldingId);
            this.pending = false;
        });
    }

    changePreview(
        content: PolymorpheusContent<TuiDialogContext>,
        header: PolymorpheusContent
    ): void {
        this.dialogService
            .open(content, {
                header: header,
                label: 'Изменить превью',
            })
            .subscribe();
    }

    async publishPreview(): Promise<void> {
        this.pending = true;
        const dto = {
            id: this.buldingId,
            preview: await compressUtility(this.preview, 0.5),
            minimizedPreview: await compressUtility(this.preview, 0.08, 600),
        };

        this.buildingsService.changePreview(dto).subscribe({
            next: (imagesPath) => {
                this.preview = null;
                if (imagesPath) {
                    this.building.preview = imagesPath[0];
                    this.building.minimizedPreview = imagesPath[1];
                }
                this.notificationsService
                    .show('', {
                        label: 'Превью изменено!',
                        status: TuiNotification.Success,
                    })
                    .subscribe();
            },
            complete: () => {
                this.pending = false;
            },
        });
    }

    discardChanges(): void {
        this.buildingForm.setValue({
            title: this.building.title,
            description: this.building.description,
            featured: this.building.featured,
        });
    }

    onImageDelete(imageUrl: string): void {
        const minImages = 1;

        if (this.building?.images?.length > minImages) {
            this.imagePending = true;
            this.buildingsService.removeImage(this.building.id, imageUrl).subscribe({
                next: () => {
                    this.notificationsService
                        .show(`Изображение удалено из работы "${this.building.title}"`, {
                            label: 'Изображени удалено!',
                            status: TuiNotification.Success,
                        })
                        .subscribe();
                    this.imagePending = false;
                    const index = this.building.images.findIndex((i) => i === imageUrl);
                    this.building.images.splice(index, 1);
                },
                error: () => {
                    this.imagePending = false;
                },
            });
        } else {
            this.notificationsService
                .show(`Минимальное число изображений в работе - ${minImages}`, {
                    label: 'Операция отменена!',
                    status: TuiNotification.Warning,
                })
                .subscribe();
        }
    }

    onImageAdded(images: string[]): void {
        this.notificationsService
            .show(`Изображения добавлены из работы "${this.building.title}"`, {
                label: 'Изображения добавлены!',
                status: TuiNotification.Success,
            })
            .subscribe();
        this.building.images.push(...images);
    }
}
