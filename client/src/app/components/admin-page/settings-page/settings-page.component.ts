import { SettingsService } from './../../../shared/services/settings/settings.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import * as md5 from 'md5';

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

    formHash!: string;
    saveEnabled = false;
    pending = false;
    buffer: any;

    constructor(
        private settingsService: SettingsService,
        private notificationsService: TuiNotificationsService
    ) {}

    ngOnInit(): void {
        this.settingsForm.valueChanges.subscribe((res) => {
            if (this.formHash) {
                this.saveEnabled = this.formHash !== md5(JSON.stringify(res));
            } else {
                this.formHash = md5(JSON.stringify(res));
            }
        });

        this.settingsService
            .getManyValue([...Object.keys(this.settingsForm.controls)])
            .subscribe((res) => {
                this.settingsForm.setValue({ ...res });
                this.buffer = res;
            });
    }

    save(): void {
        this.pending = true;
        this.settingsService.update(this.settingsForm.value).subscribe(() => {
            this.notificationsService
                .show('', {
                    label: 'Настройки обновлены!',
                    status: TuiNotification.Success,
                })
                .subscribe();
            this.formHash = md5(JSON.stringify(this.settingsForm.value));
            this.saveEnabled = false;
            this.pending = false;
        });
    }

    discardChanges(): void {
        this.settingsForm.setValue({
            ...this.buffer,
        });
    }
}
