import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async signup(username: string, password: string) { 
		const users = await this.userService.find(username)
		if (users.length) { 
			throw new BadRequestException('username in use')
		}
		
		const salt = randomBytes(8).toString('hex');
		const hash = (await scrypt(password, salt, 32)) as Buffer;
		const result = salt + '.' + hash.toString('hex');
		console.log(`signup, result: ${result}, salt: ${salt}, hash: ${hash}, storedHash: ${hash.toString('hex')}`)
		const user = this.userService.create(username, result)
		return user;
	}

	async signin(username: string, password: string) { 
		const [user] = await this.userService.find(username);
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
