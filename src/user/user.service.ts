import { config } from 'process';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/success-api-response';
import { UserDto } from './dtos/user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';


@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private repo: Repository<User>,
	private dataSource: DataSource,
	private configService: ConfigService
	) {} 


	async getDBConfiguration() {
		const dbHost = this.configService.get<string>('database.host');
		const dbPort = this.configService.get<number>('database.port');
        const dbUsername = this.configService.get<string>('database.username');
        const dbPassword = this.configService.get<string>('database.password');

		return {
			host: dbHost,
			port: dbPort, 
			username: dbUsername, 
			password: dbPassword
		}
	}
	
	async createTwo(email: string, password: string) { 
		const user1 = this.repo.create({username: '1' + email, password})
		const user2 = this.repo.create({username: '2' +email, password})

		const queryRunner = this.dataSource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		try { 
			// await queryRunner.manager.save(user1)
			// await queryRunner.manager.save(user2)
			await queryRunner.manager.save(User, user1)
			await queryRunner.manager.save(User, user2)

			const some = await queryRunner.manager.find(User)

			await queryRunner.commitTransaction()
			console.log(some)
		} catch (err) { 
			console.log(`error!!! ${err}`)
			await queryRunner.rollbackTransaction()
		} finally { 
			await queryRunner.release();
		}
	}

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
		const users = await this.repo.find()
		// return await this.repo.find()
		// return users.map(user => new UserDto(user))
		const dtos = plainToInstance(UserDto, users)

		// return plainToInstance(UserDto, users)
		// console.log(`dtos: ${dtos[0].}`)
		return dtos
		// const allUsers = await this.repo.find()

		// return SuccessAPIResponse(allUsers, 200, "testing")
	}
}