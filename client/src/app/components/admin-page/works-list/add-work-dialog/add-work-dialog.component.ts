import { compressUtility } from 'src/app/shared/utils/compress.utility';
import { BuildingsService } from './../../../../shared/services/buildings/buildings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
    TuiDialogContext,
    TuiNotification,
    TuiNotificationsService,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'mbp-add-work-dialog',
    templateUrl: './add-work-dialog.component.html',
    styleUrls: ['./add-work-dialog.component.scss'],
})
export class AddWorkDialogComponent {
    activeIndex = 0;
    maxLength = 2000;
    addWorkForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2)]),
        description: new FormControl('', Validators.required),
        featured: new FormControl(false),
    });
    files: File[] = [];
    preview!: File;
    progressText = '';
    progress = 0;
    progressDelta = 0;
    pending = false;

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any>,
        private buildingsService: BuildingsService,
        private cdr: ChangeDetectorRef,
        private notificationsService: TuiNotificationsService
    ) {}

    next(): void {
        this.activeIndex++;
    }

    previous(): void {
        this.activeIndex--;
    }

    async finish() {
        this.next();

        this.pending = true;
        this.progressText = 'Сжатие изображений';
        this.progress = 0;
        this.progressDelta = 100.0 / (this.files.length + 2);

        const dto = {
            ...this.addWorkForm.value,
            files: [
                ...(await this.compressImages([this.preview], 0.5)), // preview full size
                ...(await this.compressImages([this.preview], 0.08, true)), // preview minimized
                ...(await this.compressImages(this.files, 0.5)), // another images
            ],
        };

        this.progressText = 'Загрузка на сервер';
        this.cdr.detectChanges();

        this.buildingsService.addBuilding(dto).subscribe(() => {
            this.notificationsService
                .show('', {
                    label: 'Работа загружена успешно!',
                    status: TuiNotification.Success,
                })
                .subscribe();
            this.context.completeWith(true);
        });
    }

    private async compressImages(
        files: File[],
        maxSize: number,
        isMinimized: boolean = false
    ): Promise<File[]> {
        let compressedFiles: File[] = [];

        for (const file of files) {
            const compressedFile = await compressUtility(
                file,
                maxSize,
                isMinimized ? 600 : undefined
            );
            if (compressedFile) {
                compressedFiles.push(compressedFile);
            }
            this.progress += this.progressDelta;
            this.cdr.detectChanges();
        }

        return compressedFiles;
    }
}
