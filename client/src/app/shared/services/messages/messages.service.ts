import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { MessageDto } from '../../dto/message.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesService {
    constructor(private base: BaseService) {}

    addMessage(messageDto: MessageDto): Observable<any> {
        console.log(messageDto);
        return this.base.post<any>('messages', { ...messageDto });
    }
}
