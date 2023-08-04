import { User } from './user.entity';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { PostService } from 'src/post/post.service';
import { ParticipateService } from 'src/participate/participate.service';


@Controller('/user')
@Serialize(UserDto)
export class UserController {
	constructor(private userService: UserService, 
		private authService: AuthService, 
		private userGenreService: UserGenreService, 
		private postService: PostService, 
		private participateService: ParticipateService) {}

	// 회원 가입, Refresh Token return
	@Post('/signup')
	async createUser(@Body() body: CreateUserDto) {
		const user = await this.authService.signup(body.username, body.password)
		return user;
	}

	// 모든 User 가져오기
	@Get()
	getAllUsers() {
		return this.userService.getAll() 
	} 
	
	// 로그인, RefreshToken 으로 accessToken return 
	@Post('/login')
	async login(@Body() body: CreateUserDto) {
		const user = await this.authService.signin(body.username, body.password)
		return user;
	}

	// 로그아웃, accessToken, RefreshToken 만료시키기
	@Post('/logout')
	async logout() {}

	// id 로 특정 User 가져오기
	@Get('/:id')
	async getById(@Param('id') id: string) {
		const user = await this.userService.findOne(parseInt(id))
		if (!user) { 
			throw new NotFoundException('user not found');
		}
		return user;
	}

	// id 로 User 제거, RefreshToken, AccessToken 무효화
	@Delete('/:id')
	removeUser(@Param('id') id: string) { 
		return this.userService.remove(parseInt(id));
	}

	// user_id 로  genres 가져오기
	@Get('/:id/genres')
	async getGenres(@Param('id') id: string) {
		return this.userGenreService.getGenresByUserId(parseInt(id))
	}

	// 이 API 를 만들어야 하나..? User Defaults 로 하면 안돼 ? 음.. 이렇게 해. 
	// user_id, genre_id 로 user~genre 매칭 table 추가
	@Post('/:id/genres/:genre_id') 
	async getUserGenres(@Param('id') id: string, @Param('genre_id') genre_id: string) {
		return this.userGenreService.create(parseInt(id), parseInt(genre_id))
	}
	
	// 특정 유저가 올린 모든 surveys 가져오기! 
	@Get('/:id/posted-surveys')
	async getPostedSurveys(@Param('id') id: string) {
		return this.postService.getPostedSurveysByUserId(parseInt(id))
	} 
	
	// 특정 유저가 참여한 모든 surveys 제거. 음.. surveyController 에서 userId 를 받는게 더 낫지 않아? 
	@Get('/:id/participated-surveys')
	async getParticipatedSurveys(@Param('id') id: string) {
		return this.participateService.getParticipatedSurveysByUserId(parseInt(id))
	}
	
	// @Post('/regenerate_access_token')
}
