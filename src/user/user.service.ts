import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private repo: Repository<User>
	// , private configService: ConfigService
	) {} 

	// createToken({id, email}: User) { 
	// 	const secret = this.configService.get('JWT_SECRET');
	// 	return jwt.sign({id, email}, secret);
	// }

	async create(username: string, password: string) { 
		const user = this.repo.create({username, password})
		return await this.repo.save(user)
	}
	
	async update(id: number, attrs: Partial<User>) { 
		const user = await this.findByUserId(id)
		if (!user) { 
			throw new NotFoundException('user not found');
		}
		Object.assign(user, attrs)
		return await this.repo.save(user);
	}

	async remove(id: number) { 
		const user = await this.findByUserId(id);
		if (!user) { 
			throw new NotFoundException('user not found');
		}
		return await this.repo.remove(user)
	}

	async findByUserId(id: number) { 
		if (!id) { 
			return null
		}
		return await this.repo.findOneBy({id});
	}

	async findByUsername(username: string) { 
		return await this.repo.find({where: {username}}); 
	} 
	
	async getAll() { 
		return await this.repo.find()
	}
}