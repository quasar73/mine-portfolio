import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'mbp-image-item',
    templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss'],
})
export class ImageItemComponent {
    @Input() image!: string;
    @Input() disabled!: boolean;

    @Output() deleted = new EventEmitter();

    constructor() {}

    remove(): void {
        if (!this.disabled) {
            this.deleted.emit();
        }
    }
}
