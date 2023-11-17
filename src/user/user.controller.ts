import { CustomApiResponse } from '../util/api-response.model';
// import { ApiResponse } from './../api-response.model';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseInterceptors,
  Headers,
  HttpException,
  HttpStatus,
  // NestMiddleware,
  // NestMiddleware
} from '@nestjs/common';
// import { UseMiddleware}
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/createUser.dto';
// import { AuthService } from './auth.service';
import { AuthService } from './auth/auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserGenreService } from '../user_genre/user_genre.service';
import { PostingService } from '../posting/posting.service';
import { ParticipatingService } from '../participating/participating.service';
import { UserGenreDTO } from '../user_genre/userGenre.dto';
import { PostingDTO } from '../posting/posting.dto';
import { ParticipatingDTO } from '../participating/participating.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { FailureAPIResponse } from '../util/failure-api-response';

// import { FailureAPIResponse, SuccessAPIResponse } from '../api-response.model';

import { SuccessAPIResponse } from '../util/success-api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
import { AuthMiddleware } from 'src/auth.middleware';
import logObject from 'src/util/logObject';

// @ApiTags('User')
@ApiTags('User')
@Controller('/user')
@UseInterceptors(ToCamelCaseInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private userGenreService: UserGenreService,
    private postingService: PostingService,
    private participatingService: ParticipatingService, // private readonly apiResponseService: ApiResponseService,
  ) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'created description',
  })
  @ApiBadRequestResponse({
    description: 'bad Request Response try again',
  })
  async createUser(@Body() body: CreateUserDTO) {
    const user = await this.authService.signup(body.username, body.password);
    const userId = user.id;
    const accessToken = await this.authService.generateAccessToken(userId);
    const refreshToken = await this.authService.generateRefreshToken(userId);
    const ret = { accessToken, refreshToken, userId };
    return SuccessAPIResponse(ret, 201);
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDTO) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    const [removeToken, result] = await Promise.all([
      this.authService.removeRefreshToken(user.id),
      this.authService.publishTokens(user.id),
    ]);
    return SuccessAPIResponse(result);
  }

  @Post('/username/duplicate')
  async checkDuplicateUsername(@Body() body: { username: string }) {
    const isAvailable = await this.authService.isAvailableUsername(
      body.username,
    );

    if (isAvailable) {
      return SuccessAPIResponse();
    }
    return FailureAPIResponse();
  }

  // accessToken으로 userId 구한 후 RefreshToken 만료시킴.
  @Post('/signout')
  async signOut(@Headers('authorization') authorizationHeader: string) {
    console.log('hi');
    const accessToken = authorizationHeader.replace('Bearer ', '');
    console.log('accessToken when signout', accessToken);
    const userId: number = await this.authService.verifyAccessToken(
      accessToken,
    );

    // Refresh 토큰 만료시키기.
    await this.authService.removeRefreshToken(userId);

    return SuccessAPIResponse(null, 204, 'token removed');
  }

  // @Get('/verify')

  @Post('/auto-signin')
  async autoSignin(@Headers('refresh-token') refreshToken: string) {
    const userId = await this.authService.getUserIdFromRefreshToken(
      refreshToken,
    );
    if (typeof userId === 'number') {
      const accessToken = await this.authService.generateAccessToken(userId);
      return SuccessAPIResponse({ accessToken, userId });
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get('/details')
  async getUserDetails(
    @Headers('authorization') authorization: string,
  ): Promise<any> {
    try {
      const accessToken = authorization.replace('Bearer ', '');
      const userDetails = await this.userService.getUserDetails(accessToken);
      return userDetails;
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  // ADMIN
  // 모든 User 가져오기 (Admin)
  // @Serialize(CustomResponse<User[]>)
  @ApiOperation({ summary: 'Admin, Get all users' })
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAll();
    return SuccessAPIResponse<UserDto[]>(users);
  }

  // id 로 특정 User 가져오기

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.findByUserId(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // return user;
    return { response: SuccessAPIResponse(user) };
  }

  // id 로 User 제거,
  @Delete('/:id')
  async removeUser(
    @Param('id') id: string,
    @Headers('authorization') authorizationHeader: string,
  ) {
    const accessToken = authorizationHeader.replace('Bearer ', '');
    await this.authService.verifyAccessToken(accessToken);
    await this.authService.removeRefreshToken(parseInt(id));
    await this.userService.remove(parseInt(id));
    return SuccessAPIResponse();
  }

  getAccessToken = (text) => {
    return text.replace('Bearer ', '');
  };

  // user_id 로  genres 가져오기
  @ApiOperation({ summary: "Get user's favorite genres " })
  @Get('/:id/genres')
  // @SerializeUserGenreDTO)
  async getGenres(@Param('id') id: string) {
    const ret = await this.userGenreService.getGenresByUserId(parseInt(id));
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Remove user_genre' })
  @Delete('/:id/genre/:genre_id')
  async deleteUserGenre(
    @Param('id') id: string,
    @Param('genre_id') genre_id: string,
  ) {
    const ret = await this.userGenreService.delete(
      parseInt(id),
      parseInt(genre_id),
    );
    return SuccessAPIResponse(ret);
  }

  // 특정 유저가 올린 모든 surveys 가져오기!
  @ApiOperation({ summary: 'Get all surveys posted by the user' })
  @Get('/:id/posted-surveys')
  // // @SerializeSurveyDto)
  // @SerializePostingDTO)
  async getPostedSurveys(@Param('id') id: string) {
    // const ret = await this.postingService.getPostedSurveysByUserId(
    //   parseInt(id),
    // );
    const ret = await this.postingService.getPostedSurveyIdsByUserId(
      parseInt(id),
    );
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: "Get user's participated survey " })
  @Get('/:id/participated-surveys')
  // @SerializeParticipatingDTO)
  async getParticipatedSurveys(@Param('id') id: string) {
    const ret =
      await this.participatingService.getParticipatedSurveyIdsByUserId(
        parseInt(id),
      );
    return SuccessAPIResponse(ret);
  }
}
