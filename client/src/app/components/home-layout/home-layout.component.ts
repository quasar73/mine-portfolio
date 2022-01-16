import { Component } from '@angular/core';

@Component({
    selector: 'mbp-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent {
    constructor() {}

    scroll(el: HTMLElement) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    }
}
