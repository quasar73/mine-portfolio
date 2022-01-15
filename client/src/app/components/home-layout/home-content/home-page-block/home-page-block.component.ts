import { Component, Input } from '@angular/core';

@Component({
    selector: 'mbp-home-page-block',
    templateUrl: './home-page-block.component.html',
    styleUrls: ['./home-page-block.component.scss'],
})
export class HomePageBlockComponent {
    @Input() title = '';

    constructor() {}
}
