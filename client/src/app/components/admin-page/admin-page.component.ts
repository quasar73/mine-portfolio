import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TUI_IS_ANDROID, TUI_IS_IOS } from '@taiga-ui/cdk';
import { TUI_MOBILE_AWARE } from '@taiga-ui/kit';

@Component({
    selector: 'mbp-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss'],
    providers: [
        {
            provide: TUI_MOBILE_AWARE,
            useValue: true,
        },
        {
            provide: TUI_IS_IOS,
            useValue: true,
        },
        {
            provide: TUI_IS_ANDROID,
            useValue: false,
        },
    ],
})
export class AdminPageComponent {
    readonly tabs = [
        {
            title: 'Сообщения',
            icon: 'tuiIconComment',
            path: 'messages',
        },
        {
            title: 'Работы',
            icon: 'tuiIconPicture',
            path: 'works',
        },
    ];
    activeItemIndex = 0;

    constructor(private router: Router) {}

    redirect(path: string): void {
        this.router.navigate([`admin/${path}`]);
    }
}
