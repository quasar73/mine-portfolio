import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'mbp-home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.scss'],
    animations: [
        trigger('openWelcomeText', [
            transition(':enter', [
                style({
                    opacity: '0',
                    transform: 'translateY(160px)',
                }),
                animate(
                    '.6s ease-in-out',
                    style({
                        opacity: '1',
                        transform: 'translateY(0px)',
                    }),
                ),
            ]),
        ]),
        trigger('openHeader', [
            transition(':enter', [
                style({
                    opacity: '0',
                }),
                animate(
                    '.8s ease-in',
                    style({
                        opacity: '1',
                    }),
                ),
            ]),
        ]),
        trigger('floatingArrow', [
            state(
                'true',
                style({
                    transform: 'translateY(-8px)',
                }),
            ),
            state(
                'false',
                style({
                    transform: 'translateY(8px)',
                }),
            ),
            transition('*<=>*', animate('.7s')),
        ]),
    ],
})
export class HomeHeaderComponent {
    @Output() scrollClick = new EventEmitter();

    arrowState = false;

    constructor() {}
}
