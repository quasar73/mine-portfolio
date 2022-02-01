import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class AddBuildingDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 48)
    title: string;

    @ApiProperty()
    description: string;
}
