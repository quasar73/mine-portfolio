import { Component, Inject } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Component({
    selector: 'mbp-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
    telegram = '@shelbosha';
    discord = 'Toshaa.#5492';

    constructor(
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService,
    ) {}

    copy(info: string): void {
        this.notificationsService
            .show(`${info} скопировано в буфер обмена.`, {
                label: 'Скопировано!',
                status: TuiNotification.Info,
            })
            .subscribe();
    }
}
