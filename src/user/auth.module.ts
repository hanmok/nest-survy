import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: '046e13dae9c744286aea80fc54f6f203b1a15e36'
		}),
		TypeOrmModule.forFeature([User])
	],
	providers: [AuthService, JwtStrategy, UserService], 
	exports: [AuthService]
})
export class AuthModule {}
