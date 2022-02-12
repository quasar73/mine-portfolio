import { BaseService } from '../base/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBuildingDto } from '../../dto/add-building.dto';
import { GetBuildingDto } from '../../dto/get-building.dto';

@Injectable({ providedIn: 'root' })
export class BuildingsService {
    constructor(private base: BaseService) {}

    addBuilding(dto: AddBuildingDto): Observable<any> {
        const form = new FormData();
        form.append('title', dto.title);
        form.append('description', dto.description);
        dto.files.forEach((file) => {
            form.append('files', file);
        });
        return this.base.post<any>('buildings', form);
    }

    getBuilding(id: string): Observable<GetBuildingDto | null> {
        return this.base.get<GetBuildingDto>(`buildings/${id}`);
    }
}
