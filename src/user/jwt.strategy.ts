import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
	constructor(
		private readonly authService: AuthService, 
		private userService: UserService) { 
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false, 
			secretOrKey: '046e13dae9c744286aea80fc54f6f203b1a15e36'
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