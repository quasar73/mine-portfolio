import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { AuthDto } from 'src/shared/dto/auth.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiBody({
        type: AuthDto,
    })
    @ApiResponse({
        type: String,
        status: 200,
        description: 'Return JWT access token',
    })
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login() {
        return this.authService.login();
    }
}
