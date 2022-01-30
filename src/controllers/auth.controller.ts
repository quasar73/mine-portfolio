import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { AuthDto } from 'src/shared/dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiBody({
        type: AuthDto,
    })
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login() {
        return this.authService.login();
    }
}
