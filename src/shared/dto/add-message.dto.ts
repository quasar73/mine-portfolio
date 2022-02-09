import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddMessageDto {
    @ApiProperty()
    @IsNotEmpty()
    message: string;

    @ApiProperty({
        required: false,
    })
    discord: string;

    @ApiProperty({
        required: false,
    })
    telegram: string;

    @ApiProperty({
        required: false,
    })
    email: string;
}
