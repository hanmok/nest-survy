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
import { UserGenreDTO } from 'src/user_genre/user_genre.dto';
import { SurveyDto } from 'src/survey/survey.dto';


@Controller('/user')
// @Serialize(UserDto)
export class UserController {
	constructor(
		private userService: UserService, 
		private authService: AuthService, 
		private userGenreService: UserGenreService, 
		private postService: PostService, 
		private participateService: ParticipateService) {}

	// 회원 가입, 
	// TODO: Refresh Token return 
	@Post('/signup')
	@Serialize(UserDto)
	async createUser(@Body() body: CreateUserDto) {
		return await this.authService.signup(body.username, body.password)
	}

	// 모든 User 가져오기
	@Get()
	@Serialize(UserDto)
	async getAllUsers() {
		return await this.userService.getAll() 
	} 
	
	// 로그인, 
	// TODO: RefreshToken 으로 accessToken return 
	// ERROR!! (salt 과정 재확인 필요)

	@Post('/login')
	@Serialize(UserDto)
	async login(@Body() body: CreateUserDto) {
		return await this.authService.signin(body.username, body.password)
	}

	// 로그아웃, 
	// TODO: accessToken, RefreshToken 만료시키기
	@Post('/logout/:id')
	logout() {} 

	// id 로 특정 User 가져오기
	@Get('/:id')
	@Serialize(UserDto)
	async getById(@Param('id') id: string) {
		const user = await this.userService.findOne(parseInt(id))
		if (!user) { 
			throw new NotFoundException('user not found');
		}
		return user;
	}

	// id 로 User 제거, 
	// TODO: RefreshToken, AccessToken 무효화
	@Delete('/:id')
	@Serialize(UserDto)
	async removeUser(@Param('id') id: string) { 
		return await this.userService.remove(parseInt(id));
	}

	// user_id 로  genres 가져오기
	@Get('/:id/genres')
	@Serialize(UserGenreDTO)
	async getGenres(@Param('id') id: string) {
		return await this.userGenreService.getGenresByUserId(parseInt(id))
	}

	// user_id, genre_id 로 user~genre 매칭 table 추가
	// @Post('/:id/genres/:genre_id') 
	// async getUserGenres(@Param('id') id: string, @Param('genre_id') genre_id: string) {
	// 	return await this.userGenreService.create(parseInt(id), parseInt(genre_id))
	// }

	@Post('/append/genre')
	@Serialize(UserGenreDTO)
	async createUserGenres(@Body() body: UserGenreDTO) { 
		return await this.userGenreService.create(body.user_id, body.genre_id)
	}
	
	// 특정 유저가 올린 모든 surveys 가져오기! 
	@Get('/:id/posted-surveys')
	@Serialize(SurveyDto)
	async getPostedSurveys(@Param('id') id: string) {
		return await this.postService.getPostedSurveysByUserId(parseInt(id))
	} 
	
	// 특정 유저가 참여한 모든 surveys 제거. 음.. surveyController 에서 userId 를 받는게 더 낫지 않아? 
	@Get('/:id/participated-surveys')
	@Serialize(SurveyDto)
	async getParticipatedSurveys(@Param('id') id: string) {
		return await this.participateService.getParticipatedSurveysByUserId(parseInt(id))
	}
	
	// @Post('/regenerate_access_token')
}
