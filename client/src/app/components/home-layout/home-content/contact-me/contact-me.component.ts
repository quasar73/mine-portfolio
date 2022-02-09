import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { AtLeastOneValidator } from 'src/app/shared/validators/at-least-one.validator';

@Component({
    selector: 'mbp-contact-me',
    templateUrl: './contact-me.component.html',
    styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent {
    maxLength = 400;

    contactForm = new FormGroup({
        contacts: new FormGroup(
            {
                email: new FormControl('', Validators.email),
                telegram: new FormControl(''),
                discord: new FormControl(''),
            },
            { validators: [AtLeastOneValidator()] }
        ),
        message: new FormControl('', [
            Validators.required,
            Validators.maxLength(this.maxLength),
        ]),
    });
    showLoader = false;

    constructor(
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService,
        private messagesService: MessagesService
    ) {}

    send(): void {
        if (this.contactForm.invalid) {
            this.notificationsService
                .show(
                    `Введите сообщение и, как минимум, одно из следующих полей: Email, Discord, Telegram.`,
                    {
                        label: 'Форма не валидна!',
                        status: TuiNotification.Warning,
                    }
                )
                .subscribe();
        } else {
            this.showLoader = true;
            const dto = {
                message: this.contactForm.get('message')?.value,
                email: this.contactForm.get('contacts')?.get('email')?.value,
                telegram: this.contactForm.get('contacts')?.get('telegram')?.value,
                discord: this.contactForm.get('contacts')?.get('discord')?.value,
            };

            this.messagesService.addMessage(dto).subscribe(() => {
                this.notificationsService
                    .show('Ваше сообщение было успешно отправленно!', {
                        label: 'Отправлено',
                        status: TuiNotification.Success,
                    })
                    .subscribe();
                this.showLoader = false;
                this.contactForm.reset();
            });
        }
    }
}
