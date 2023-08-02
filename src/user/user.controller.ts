import { User } from './user.entity';
import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('/user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('/signup')
	async createUser() {}

	@Get()
	async getAllUsers() {} 

	@Post('/login')
	async login() {}

	@Post('/logout')
	async logout() {}

	@Get('/:id')
	async getById() {}

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
