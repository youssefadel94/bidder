import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { jwtConstants } from '../../config/const';
import { AuthController } from './controllers/auth/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule { }