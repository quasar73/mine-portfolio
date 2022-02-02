import { ApiProperty } from '@nestjs/swagger';

export class BuildingResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    featured: boolean;

    @ApiProperty()
    images: string[];
}
