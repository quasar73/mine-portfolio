import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class AuthDto {
    @ApiProperty()
    @IsEmpty()
    username: string;

    @ApiProperty()
    @IsEmpty()
    password: string;
}
