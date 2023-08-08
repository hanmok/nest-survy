import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
// import { AuthService } from './auth.service';
import { AuthService } from './auth/auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { PostingService } from 'src/posting/posting.service';
import { ParticipatingService } from 'src/participating/participating.service';
import { UserGenreDTO } from 'src/user_genre/userGenre.dto';
import { SurveyDto } from 'src/survey/survey.dto';
import { PostingDTO } from 'src/posting/posting.dto';


@Controller('/user')
export class UserController {
	constructor(
		private userService: UserService, 
		private authService: AuthService, 
		private userGenreService: UserGenreService, 
		private postingService: PostingService, 
		private participatingService: ParticipatingService) {}

	// 회원 가입, 
	@Post('/signup')
	async createUser(@Body() body: CreateUserDto) {
		const user = await this.authService.signup(body.username, body.password)
		const userId = user.id
		const accessToken = await this.authService.generateAccessToken(userId)
		const refreshToken = await this.authService.generateRefreshToken(userId)
		return { accessToken, refreshToken, userId }
	}

	async publishTokens(userId) { 
		const accessToken = await this.authService.generateAccessToken(userId)
		const refreshToken = await this.authService.generateRefreshToken(userId)
		return { accessToken, refreshToken, userId }
	}

	@Post('/signin') 
	async login(@Body() body: CreateUserDto) { 
		// id, password 확인
		const user = await this.authService.signin(body.username, body.password)
		const userId = user.id
		// 토큰이 둘다 없어야함. 토큰 있으면 Error 출력, 없으면 새로 발급
		if (this.authService.userHasToken(userId)) {
			return { 
				statusCode: 400,
				message: 'please logout first'
			}
		}
		return await this.publishTokens(userId) 
	}

	// 로그아웃
	// accessToken, RefreshToken 만료시킴. 
	@Post('/logout/:id')
	async logout(@Param('id') id: string) {
		return await this.authService.removeTokens(parseInt(id))
	} 

	@Post('/auto_signin')
	async autoSignin(@Body() body: {refreshToken: string}) { 
		const userId = await this.authService.verifyRefreshToken(body.refreshToken)
		if (userId) { 
			// AccessToken 제거 
			const _ = await this.authService.removeAccessToken(userId)
			const accessToken = await this.authService.generateAccessToken(userId)
			return { accessToken, userId }
		} else { 
			return new UnauthorizedException(); // 토큰 없으면 토큰 만료
		}
	}



	// user_id 로  genres 가져오기
	@Get('/:id/genres')
	@Serialize(UserGenreDTO)
	async getGenres(@Param('id') id: string) {
		return await this.userGenreService.getGenresByUserId(parseInt(id))
	} 

	// user_id, genre_id 로 user~genre 매칭 table 추가
	@Post('/:id/genre/:genre_id/connection') 
	async getUserGenres(@Param('id') id: string, @Param('genre_id') genre_id: string) { 
		return await this.userGenreService.create(parseInt(id), parseInt(genre_id))
	}
	
	// 특정 유저가 올린 모든 surveys 가져오기! 
	@Get('/:id/posted-surveys')
	// @Serialize(SurveyDto)
	@Serialize(PostingDTO)
	async getPostedSurveys(@Param('id') id: string) {
		return await this.postingService.getPostedSurveysByUserId(parseInt(id))
	} 
	
	// 특정 유저가 참여한 모든 surveys 제거. 음.. surveyController 에서 userId 를 받는게 더 낫지 않아? 
	@Get('/:id/participated-surveys')
	@Serialize(SurveyDto)
	async getParticipatedSurveys(@Param('id') id: string) {
		return await this.participatingService.getParticipatedSurveysByUserId(parseInt(id))
	}


	// ADMIN

	// 모든 User 가져오기 (Admin)
	@Get()
	@Serialize(UserDto)
	async getAllUsers() {
		return await this.userService.getAll() 
	} 

	// id 로 특정 User 가져오기
	@Get('/:id')
	@Serialize(UserDto)
	async getById(@Param('id') id: string) {
		const user = await this.userService.findByUserId(parseInt(id))
		if (!user) { 
			throw new NotFoundException('user not found');
		}
		return user;
	}

	// id 로 User 제거, 
	@Delete('/:id')
	@Serialize(UserDto)
	async removeUser(@Param('id') id: string) { 
		const _ = await this.authService.removeTokens(parseInt(id))
		return await this.userService.remove(parseInt(id));
	}
}