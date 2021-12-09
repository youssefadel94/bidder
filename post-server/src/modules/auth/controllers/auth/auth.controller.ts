import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // @UseGuards(LocalAuthGuard) // uncomment this line to use local auth
    @Post('login')
    async login(@Request() req) { // use @Body() to get the body of the request
        // console.log(req);
        return this.authService.login(req.body.user); // if @Body() used replace the req.body.user with req.user 
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}