import { ApiProperty } from '@nestjs/swagger';

export class GetSettingDto {
    @ApiProperty()
    value: string;
}
