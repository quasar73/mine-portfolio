import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'mbp-contact-me',
    templateUrl: './contact-me.component.html',
    styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent {
    contactForm = new FormGroup({
        email: new FormControl('', Validators.email),
        telegram: new FormControl(''),
        discord: new FormControl(''),
        message: new FormControl('', Validators.required),
    });

    constructor() {}
}
