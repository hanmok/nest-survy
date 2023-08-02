import { User } from './user.entity';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';


@Controller('/user')
export class UserController {
	constructor(private userService: UserService, private authService: AuthService) {}

	@Post('/signup')
	async createUser(@Body() body: CreateUserDto) {
		// const user = await this.
		const user = await this.authService.signup(body.email, body.password)
		return user;
	}

	@Get()
	async getAllUsers() {} 

	@Post('/login')
	async login(@Body() body: CreateUserDto) {
		const user = await this.authService.signin(body.email, body.password)
		return user;
	}

	@Post('/logout')
	async logout() {}

	@Get('/:id')
	async getById(@Param('id') id: string) {
		const user = await this.userService.findOne(parseInt(id))
		if (!user) { 
			throw new NotFoundException('user not found');
		}
		return user;
	}

	@Delete('/:id')
	removeUser(@Param('id') id: string) { 
		return this.userService.remove(parseInt(id));
	}

	@Get('/:user_id/genres')
	async getGenres() {}

	@Post('/:user_id/genres/:genre_id') // 이게 뭐야? 
	async getUserGenres() {}
	
	@Get('/:user_id/posted-surveys')
	async getPostedSurveys() {}

	@Post('/posted-surveys')
	async postSurvey() {}
	
	@Get('/:user_id/participated-surveys')
	async getParticipatedSurveys() {}
	
}
