import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/createUser.dto';
// import { AuthService } from './auth.service';
import { AuthService } from './auth/auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { PostingService } from 'src/posting/posting.service';
import { ParticipatingService } from 'src/participating/participating.service';
import { UserGenreDTO } from 'src/user_genre/userGenre.dto';
import { PostingDTO } from 'src/posting/posting.dto';
import { ParticipatingDTO } from 'src/participating/participating.dto';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags, ApiOperation } from '@nestjs/swagger'

// @ApiTags('User')
@ApiTags('User')
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
	@ApiCreatedResponse({
		description: "created description"
	})
	@ApiBadRequestResponse({
		description: "bad Request Response try again"
	})
	async createUser(@Body() body: CreateUserDTO) {
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
	async login(@Body() body: CreateUserDTO) { 
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
	@Post('/:id/logout')
	async logout(@Param('id') id: string) {
		return await this.authService.removeTokens(parseInt(id))
	} 

	@Post('/auto-signin')
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

	// ADMIN

	// 모든 User 가져오기 (Admin)
	@ApiOperation({summary: 'Admin, Get all users'})
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
	
	// user_id 로  genres 가져오기
	@ApiOperation({summary: "Get user's favorite genres "})
	@Get('/:id/genres')
	@Serialize(UserGenreDTO)
	async getGenres(@Param('id') id: string) {
		return await this.userGenreService.getGenresByUserId(parseInt(id))
	} 


	@ApiOperation({summary: 'Remove user_genre'})
	@Delete('/:id/genre/:genre_id')
	async deleteUserGenre(@Param('id') id: string, @Param('genre_id') genre_id: string) { 
		return await this.userGenreService.delete(parseInt(id), parseInt(genre_id))
	}
	
	// 특정 유저가 올린 모든 surveys 가져오기! 
	@ApiOperation({summary: 'Get all surveys posted by the user'})
	@Get('/:id/posted-surveys')
	// @Serialize(SurveyDto)
	@Serialize(PostingDTO)
	async getPostedSurveys(@Param('id') id: string) {
		return await this.postingService.getPostedSurveysByUserId(parseInt(id))
	} 

	@ApiOperation({summary: "Get user's participated survey "})
	@Get('/:id/participated-surveys')
	@Serialize(ParticipatingDTO) 
	async getParticipatedSurveys(@Param('id') id: string) {
		return await this.participatingService.getParticipatedSurveysByUserId(parseInt(id))
	}
}
