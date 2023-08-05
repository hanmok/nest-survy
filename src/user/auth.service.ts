import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(
		// private userService: UserService, 
		private readonly jwtService: JwtService,
		@InjectRepository(User) private repo: Repository<User>
		) {}

	// async generateJwtToken(payload: any) { 
	async generateAccessToken(payload: any) {
		return await this.jwtService.sign(payload, {expiresIn: '1d'})
	}

	async generateRefreshToken(payload: any) {
		return await this.jwtService.sign(payload, {expiresIn: '60d'})
	}

	async verifyToken(token: string) { 
		return this.jwtService.verify(token)
	}

	async signup(username: string, password: string) { 
		// const users = await this.userService.findByUsername(username)
		const users = await this.repo.find({where: {username}})
		if (users.length) { 
			throw new BadRequestException('username in use')
		}
		
		const salt = randomBytes(8).toString('hex');
		const hash = (await scrypt(password, salt, 32)) as Buffer;
		const result = salt + '.' + hash.toString('hex');
		console.log(`signup, result: ${result}, salt: ${salt}, hash: ${hash}, storedHash: ${hash.toString('hex')}`)
		// const user = this.userService.create(username, result)
		const user = this.repo.create({username, password: result})
		const _ = await this.repo.save(user)
		return user;
	}



	// 음.. Userservice 를 왜 여기서 쓰고있어? 
	async signin(username: string, password: string) { 
		// const [user] = await this.userService.findByUsername(username);
		const [user] = await this.repo.find({where: {username}})

		if (!user) { 
			throw new NotFoundException('user not found');
		}

		const [salt, storedHash] = user.password.split('.');

		const hash = (await scrypt(password, salt, 32)) as Buffer;

		console.log(`signin, result: ${user.password}, salt: ${salt}, hash: ${hash}, turned hash: ${hash.toString('hex')}, storedHash: ${storedHash}`) 

		if (storedHash !== hash.toString('hex')) { 
			throw new BadRequestException('bad password');
		}
		return user;
	}
}
