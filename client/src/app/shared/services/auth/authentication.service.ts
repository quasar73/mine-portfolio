import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { TokenStorage } from './token-storage.service';
import { BaseService } from '../base/base.service';
import { LoginDto } from '../../dto/login.dto';

interface AccessData {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements AuthService {
    constructor(
        private readonly tokenStorage: TokenStorage,
        private base: BaseService,
    ) {}

    public isAuthorized(): Observable<boolean> {
        return this.tokenStorage.getAccessToken().pipe(map((token) => !!token));
    }

    public getAccessToken(): Observable<string> {
        return this.tokenStorage.getAccessToken();
    }

    public refreshToken(): Observable<AccessData> {
        return of({ token: '' });
    }

    public refreshShouldHappen(response: HttpErrorResponse): boolean {
        return response.status === 401;
    }

    public verifyTokenRequest(url: string): boolean {
        return url.endsWith('/refresh');
    }

    public login(loginDto: LoginDto): Observable<any> {
        return this.base.post('auth/login', loginDto).pipe(
            tap((response: any) => {
                this.saveAccessData(response.token);
            }),
        );
    }

    public logout(): void {
        this.tokenStorage.clear();
    }

    public saveAccessDataPublic(token: string): void {
        this.tokenStorage.setAccessToken(token);
    }

    private saveAccessData(token: string): void {
        this.tokenStorage.setAccessToken(token);
    }

    private saveRefreshToken(token: string): void {
        this.tokenStorage.setRefreshToken(token);
    }
}
