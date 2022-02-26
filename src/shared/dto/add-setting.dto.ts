import { ApiProperty } from '@nestjs/swagger';

export class AddSettingDto {
    @ApiProperty()
    key: string;

    @ApiProperty()
    value: string;
}
