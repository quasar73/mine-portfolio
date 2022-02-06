import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const login = this.configService.get('LOGIN');
        const password = this.configService.get('PASSWORD');
        if (username === login && pass === password) {
            return login;
        }
        return null;
    }

    async login() {
        return {
            token: this.jwtService.sign({}),
        };
    }
}
