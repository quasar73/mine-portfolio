import { BaseService } from '../base/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBuildingDto } from '../../dto/add-building.dto';
import { GetBuildingDto } from '../../dto/get-building.dto';
import { GetBuildingsDto } from '../../dto/get-buildings.dto';
import { UpdateBuildingDto } from '../../dto/update-building.dto';
import { ChangePreviewDto } from '../../dto/change-preview.dto';

@Injectable({ providedIn: 'root' })
export class BuildingsService {
    constructor(private base: BaseService) {}

    addBuilding(dto: AddBuildingDto): Observable<any> {
        const form = new FormData();
        form.append('title', dto.title);
        form.append('description', dto.description);
        form.append('featured', `${dto.featured}`);
        dto.files.forEach((file) => {
            form.append('files', file);
        });
        return this.base.post<any>('buildings', form);
    }

    getBuilding(id: string): Observable<GetBuildingDto | null> {
        return this.base.get<GetBuildingDto>(`buildings/${id}`);
    }

    getFeaturedBuildings(): Observable<GetBuildingsDto[] | null> {
        return this.base.get<GetBuildingsDto[]>('buildings/featured');
    }

    getBuildings(): Observable<GetBuildingsDto[] | null> {
        return this.base.get<GetBuildingsDto[]>('buildings');
    }

    updateBuildings(dto: UpdateBuildingDto): Observable<any> {
        return this.base.put<any>('buildings', dto);
    }

    changePreview(dto: ChangePreviewDto): Observable<string[] | null> {
        const form = new FormData();
        if (dto.preview && dto.minimizedPreview) {
            form.append('previews', dto.preview);
            form.append('previews', dto.minimizedPreview);
        }
        return this.base.put<string[]>(`buildings/preview/${dto.id}`, form);
    }

    removeBuilding(id: string): Observable<any> {
        return this.base.delete<any>(`buildings/${id}`);
    }
}
