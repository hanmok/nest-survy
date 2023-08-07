import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
// import { UserService } from "../user.service";
import { UserService } from "./user.service";
require('dotenv').config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
	constructor(
		private userService: UserService) { 
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false, 
			// secret: process.env.JWT_SECRET_KEY
			// secret: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
			// key: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
			secretOrKey: '046e13dae9c744286aea80fc54f6f203b1a15e36F',
			secretOrPrivateKey: '046e13dae9c744286aea80fc54f6f203b1a15e36F'
		})
	}

	async validate(payload: any) { 
		// const user = await this.userService.findByUsername(payload.userId)
		const user = await this.userService.findByUserId(payload.userId)
		if (!user) { 
			throw new UnauthorizedException();
		}
		return user;
	}
}