import { BuildingsService } from './../../../../../../shared/services/buildings/buildings.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { compressUtility } from 'src/app/shared/utils/compress.utility';

@Component({
    selector: 'mbp-image-uplaoder',
    templateUrl: './image-uplaoder.component.html',
    styleUrls: ['./image-uplaoder.component.scss'],
})
export class ImageUplaoderComponent {
    @Input() id!: string;

    @Output() added = new EventEmitter<string[]>();

    files!: File[];
    pending = false;

    constructor(private buildingsService: BuildingsService) {}

    async addImages(): Promise<void> {
        this.pending = true;
        const compressedImages = await this.compressImages([...this.files], 0.5);
        this.buildingsService.addImages(this.id, compressedImages).subscribe({
            next: (images) => {
                this.added.emit(images ?? []);
                this.files = [];
                this.pending = false;
            },
            error: () => {
                this.pending = false;
            },
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
        }

        return compressedFiles;
    }
}
