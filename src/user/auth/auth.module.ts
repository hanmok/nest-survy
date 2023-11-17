import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { JwtStrategy } from '../jwt/jwt.strategy';
import { JwtStrategy } from '../jwt.strategy';
import { UserService } from '../user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
// import { RefreshToken } from '../jwt/refreshToken.entity';
import { RefreshToken } from '../refreshToken.entity';
require('dotenv').config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
      secretOrPrivateKey: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
      // secret:
    }),
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
