import { ApiProperty } from '@nestjs/swagger';

export class BuildingResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    images: string[];
}
