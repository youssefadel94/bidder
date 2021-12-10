import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    validateUser(username: string, pass: string) {
        const user = this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        console.log(this.validateUser(user.username, user.password));
        
            if (this.validateUser(user.username, user.password))
                return {
                    access_token: this.jwtService.sign(payload),
                    status: "success",
                    userId: this.usersService.findOne(user.username).userId
                }
            else
                return {
                    access_token: null,
                    status: "not found",
                };
        
        
    }
}