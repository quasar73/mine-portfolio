import { BuildingsService } from './../../../../shared/services/buildings/buildings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
    TuiDialogContext,
    TuiNotification,
    TuiNotificationsService,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import imageCompression from 'browser-image-compression';

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
    });
    files: File[] = [];
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
        this.progressDelta = 100.0 / this.files.length;

        const dto = {
            ...this.addWorkForm.value,
            files: await this.compressImages(this.files),
        };

        this.progressText = 'Загрузка на сервер';
        this.cdr.detectChanges();

        this.buildingsService.addWork(dto).subscribe(() => {
            this.notificationsService
                .show('', {
                    label: 'Работа загружена успешно!',
                    status: TuiNotification.Success,
                })
                .subscribe();
            this.context.completeWith(true);
        });
    }

    private async compressImages(files: File[]): Promise<File[]> {
        const options = {
            maxSizeMB: 0.5,
        };
        let compressedFiles: File[] = [];

        for (const file of files) {
            const compressedBlob = await imageCompression(file, options);
            const compressedFile = new File([compressedBlob], file.name);
            compressedFiles.push(compressedFile);
            this.progress += this.progressDelta;
            this.cdr.detectChanges();
        }

        return compressedFiles;
    }
}
