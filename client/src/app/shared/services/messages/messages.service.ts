import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { MessageDto } from '../../dto/message.dto';
import { Observable } from 'rxjs';
import { GetMessageDto } from '../../dto/get-message.dto';
import { UpdateMessageDto } from '../../dto/update-message.dto';

@Injectable({ providedIn: 'root' })
export class MessagesService {
    constructor(private base: BaseService) {}

    addMessage(messageDto: MessageDto): Observable<any> {
        return this.base.post<any>('messages', { ...messageDto });
    }

    getMessages(onlyUnreaded: boolean): Observable<GetMessageDto[] | null> {
        return this.base.get<GetMessageDto[]>('messages', { onlyUnreaded });
    }

    updateMessage(
        updateMessageDto: UpdateMessageDto
    ): Observable<UpdateMessageDto | null> {
        return this.base.put<UpdateMessageDto>('messages', updateMessageDto);
    }
}
