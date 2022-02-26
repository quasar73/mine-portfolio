import { SettingsService } from './../../../shared/services/settings/settings.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Component({
    selector: 'mbp-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
    settingsForm = new FormGroup({
        aboutMe: new FormControl(),
        telegram: new FormControl(),
        discord: new FormControl(),
    });

    constructor(
        private settingsService: SettingsService,
        private notificationsService: TuiNotificationsService
    ) {}

    ngOnInit(): void {
        this.settingsService
            .getManyValue([...Object.keys(this.settingsForm.controls)])
            .subscribe((res) => {
                Object.keys(res).forEach((key) => {
                    if (this.settingsForm.contains(key)) {
                        this.settingsForm.controls[key].setValue(res[key]);
                    }
                });
            });
    }

    save(): void {
        this.settingsService.update(this.settingsForm.value).subscribe(() => {
            this.notificationsService
                .show('', {
                    label: 'Настройки обновлены!',
                    status: TuiNotification.Success,
                })
                .subscribe();
        });
    }
}
