import { GetMessageDto } from './../../../shared/dto/get-message.dto';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Component({
    selector: 'mbp-messages-list',
    templateUrl: './messages-list.component.html',
    styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
    toggleControl = new FormControl(false);
    messages: GetMessageDto[] = [];
    updating = false;

    constructor(
        private messagesService: MessagesService,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService
    ) {}

    ngOnInit(): void {
        this.toggleControl.valueChanges.subscribe((value) => this.getMessages(value));
        this.getMessages(false);
    }

    getMessages(onlyUnreaded: boolean): void {
        this.messagesService.getMessages(onlyUnreaded).subscribe((messages) => {
            this.messages = messages ?? [];
        });
    }

    getTitleString(message: GetMessageDto): string {
        return this.getArrayOfContacts(message).join(' • ');
    }

    getDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU');
    }

    onReadClick(message: GetMessageDto): void {
        const update = {
            id: message.id,
            seen: !message.seen,
        };
        this.updating = true;
        this.messagesService.updateMessage(update).subscribe(() => {
            message.seen = !message.seen;
            this.updating = false;
        });
    }

    getArrayOfContacts(message: GetMessageDto): string[] {
        return [message?.email, message?.telegram, message?.discord].filter(
            (c) => c?.length
        );
    }

    copy(info: string): void {
        navigator.clipboard.writeText(info);
        this.notificationsService
            .show(`${info} скопировано в буфер обмена.`, {
                label: 'Скопировано!',
                status: TuiNotification.Info,
            })
            .subscribe();
    }
}
