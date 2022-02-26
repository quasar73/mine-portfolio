import { SettingsService } from './../../../../shared/services/settings/settings.service';
import { Component, Inject, OnInit } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Component({
    selector: 'mbp-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
    telegram!: string | null;
    discord!: string | null;
    aboutMe!: string | null;

    constructor(
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService,
        public settingsService: SettingsService
    ) {}

    ngOnInit(): void {
        const settings = ['about_me', 'telegram', 'discord'];
        this.settingsService.getManyValue(settings).subscribe((res) => {
            this.discord = res?.discord;
            this.telegram = res?.telegram;
            this.aboutMe = res?.about_me;
        });
    }

    copy(info: string | null): void {
        navigator.clipboard.writeText(info ?? '');
        this.notificationsService
            .show(`${info} скопировано в буфер обмена.`, {
                label: 'Скопировано!',
                status: TuiNotification.Info,
            })
            .subscribe();
    }
}
