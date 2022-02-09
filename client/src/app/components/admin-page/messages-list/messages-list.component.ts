import { GetMessageDto } from './../../../shared/dto/get-message.dto';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mbp-messages-list',
    templateUrl: './messages-list.component.html',
    styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
    toggleControl = new FormControl(false);
    messages: GetMessageDto[] = [];

    constructor(private messagesService: MessagesService) {}

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
        return [message?.email, message?.telegram, message?.discord]
            .filter((c) => c?.length)
            .join(' • ');
    }

    getDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU');
    }
}
