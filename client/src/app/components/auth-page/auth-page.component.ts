import { AuthenticationService } from './../../shared/services/auth/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
    selector: 'mbp-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    constructor(
        private authService: AuthenticationService,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService,
        private router: Router,
    ) {}

    signIn(): void {
        const loginDto = {
            ...this.loginForm.value,
        };
        this.authService.login(loginDto).subscribe(
            () => {
                this.notificationsService
                    .show('', {
                        label: 'Успешный вход',
                        status: TuiNotification.Success,
                    })
                    .subscribe();
                this.router.navigate(['admin']);
            },
            () => {
                this.notificationsService
                    .show('', {
                        label: 'Неверные данные для входа',
                        status: TuiNotification.Error,
                    })
                    .subscribe();
            },
        );
    }
}
