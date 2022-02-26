import { Observable } from 'rxjs';
import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { GetSettingDto } from '../../dto/get-setting.dto';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    constructor(private base: BaseService) {}

    getValue(key: string): Observable<GetSettingDto | null> {
        return this.base.get<GetSettingDto>('settings', { key });
    }

    getManyValue(keys: string[]): Observable<any> {
        return this.base.get<any>('settings/many', { keys });
    }
}
