import { ApiProperty } from '@nestjs/swagger';

export class BuildingsListDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    preview: string;

    @ApiProperty()
    minimizedPreview: string;

    @ApiProperty()
    featured: boolean;
}
