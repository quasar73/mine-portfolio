import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    discord: string;

    @ApiProperty()
    telegram: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    seen: boolean;
}
