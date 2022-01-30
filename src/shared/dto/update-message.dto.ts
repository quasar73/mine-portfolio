import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    seen: boolean;
}
