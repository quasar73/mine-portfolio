import { ApiProperty } from '@nestjs/swagger';

export class BuildingsListDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    image: string;
}
