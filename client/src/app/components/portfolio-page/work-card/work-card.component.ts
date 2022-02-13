import { GetBuildingsDto } from 'src/app/shared/dto/get-buildings.dto';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'mbp-work-card',
    templateUrl: './work-card.component.html',
    styleUrls: ['./work-card.component.scss'],
})
export class WorkCardComponent {
    @Input() building!: GetBuildingsDto;

    constructor() {}
}
