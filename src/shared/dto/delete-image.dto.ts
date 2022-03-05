import { ApiProperty } from '@nestjs/swagger';

export class DeleteImageDto {
    @ApiProperty()
    buildingId: string;

    @ApiProperty()
    imageUrl: string;
}
