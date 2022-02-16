import { Router } from '@angular/router';
import { AuthenticationService } from './../../../shared/services/auth/authentication.service';
import { Component } from '@angular/core';

@Component({
    selector: 'mbp-base-layout-header',
    templateUrl: './base-layout-header.component.html',
    styleUrls: ['./base-layout-header.component.scss'],
})
export class BaseLayoutHeaderComponent {
    constructor(public authService: AuthenticationService, private router: Router) {}

    logout(): void {
        this.authService.logout();
        this.router.navigate(['home']);
    }
}
