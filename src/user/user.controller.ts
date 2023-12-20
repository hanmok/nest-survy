// import { CustomApiResponse } from '../util/api-response';
// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Delete,
//   Get,
//   NotFoundException,
//   Param,
//   Patch,
//   Post,
//   UnauthorizedException,
//   UseInterceptors,
//   Headers,
//   HttpException,
//   HttpStatus,
//   Query,
//   // NestMiddleware,
//   // NestMiddleware
// } from '@nestjs/common';
// // import { UseMiddleware}
// import { UserService } from './user.service';
// import { CreateUserDTO } from './dtos/createUser.dto';
// // import { AuthService } from './auth.service';
// import { AuthService } from './auth/auth.service';
// import { Serialize } from '../interceptors/serialize.interceptor';
// import { UserDto } from './dtos/user.dto';
// import { UserGenreService } from '../user_genre/user_genre.service';
// import { PostingService } from '../posting/posting.service';
// import { ParticipatingService } from '../participating/participating.service';
// import { UserGenreDTO } from '../user_genre/userGenre.dto';
// import { PostingDTO } from '../posting/posting.dto';
// import { ParticipatingDTO } from '../participating/participating.dto';
// import {
//   ApiCreatedResponse,
//   ApiBadRequestResponse,
//   ApiTags,
//   ApiOperation,
// } from '@nestjs/swagger';

// import { FailureAPIResponse, SuccessAPIResponse } from '../util/api-response';
// import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
// import { AuthMiddleware } from 'src/auth.middleware';
// import logObject from 'src/util/logObject';
// import { MailService } from 'src/mail/mail.service';

// // @ApiTags('User')
// @ApiTags('User')
// @Controller('/user')
// @UseInterceptors(ToCamelCaseInterceptor)
// export class UserController {
//   constructor(
//     private userService: UserService,
//     private authService: AuthService,
//     private userGenreService: UserGenreService,
//     private postingService: PostingService,
//     private participatingService: ParticipatingService, // private readonly apiResponseService: ApiResponseService,
//     private readonly mailService: MailService,
//   ) {}

//   @Post('/signup')
//   @ApiCreatedResponse({
//     description: 'created description',
//   })
//   @ApiBadRequestResponse({
//     description: 'bad Request Response try again',
//   })
//   async createUser(@Body() body: CreateUserDTO) {
//     const user = await this.authService.signup(
//       body.username,
//       body.password,
//       body.phone_number,
//       body.birth_date,
//       body.is_male,
//     );
//     const userId = user.id;
//     const accessToken = await this.authService.generateAccessToken(userId);
//     const refreshToken = await this.authService.generateRefreshToken(userId);
//     const ret = { accessToken, refreshToken, userId };
//     return SuccessAPIResponse(ret, 201);
//   }

//   @Post('/signin')
//   async signIn(@Body() body: CreateUserDTO) {
//     try {
//       const user = await this.authService.validateUser(
//         body.username,
//         body.password,
//       );

//       const [removeToken, result] = await Promise.all([
//         this.authService.removeRefreshToken(user.id),
//         this.authService.publishTokens(user.id),
//       ]);
//       return SuccessAPIResponse(result);
//     } catch (error) {
//       return FailureAPIResponse(error.message);
//     }
//   }

//   @Post('/username/duplicate')
//   async checkDuplicateUsername(@Body() body: { username: string }) {
//     const isAvailable = await this.authService.isAvailableUsername(
//       body.username,
//     );

//     if (isAvailable) {
//       return SuccessAPIResponse();
//     }
//     return FailureAPIResponse();
//   }

//   @Post('/phone-number/duplicate')
//   // async checkDuplicatePhoneNumber(@Body() body: { phoneNumber: string }) {
//   async checkDuplicatePhoneNumber(@Body() body: { phone: string }) {
//     const isAvailable = await this.authService.isAvailablePhoneNumber(
//       body.phone,
//     );

//     if (isAvailable) {
//       return SuccessAPIResponse();
//     }
//     return FailureAPIResponse();
//   }

//   @Post('/check-username-phone')
//   async checkUsernamePhone(@Body() body: { phone: string; username: string }) {
//     try {
//       const isValid = await this.authService.validateUsernamePhone(
//         body.username,
//         body.phone,
//       );
//       if (!!isValid) {
//         return SuccessAPIResponse();
//       }
//       return FailureAPIResponse();
//     } catch (error) {
//       return FailureAPIResponse();
//     }
//   }

//   // accessToken으로 userId 구한 후 RefreshToken 만료시킴.
//   @Post('/signout')
//   async signOut(@Headers('authorization') authorizationHeader: string) {
//     console.log('hi');
//     const accessToken = authorizationHeader.replace('Bearer ', '');
//     console.log('accessToken when signout', accessToken);
//     const userId: number = await this.authService.verifyAccessToken(
//       accessToken,
//     );

//     // Refresh 토큰 만료시키기.
//     await this.authService.removeRefreshToken(userId);

//     return SuccessAPIResponse(null, 204, 'token removed');
//   }

//   // @Get('/verify')

//   @Post('/auto-signin')
//   async autoSignin(@Headers('refresh-token') refreshToken: string) {
//     const userId = await this.authService.getUserIdFromRefreshToken(
//       refreshToken,
//     );
//     if (typeof userId === 'number') {
//       const accessToken = await this.authService.generateAccessToken(userId);
//       return SuccessAPIResponse({ accessToken, userId });
//     } else {
//       throw new UnauthorizedException();
//     }
//   }

//   @Get('/details')
//   async getUserDetails(
//     @Headers('authorization') authorization: string,
//   ): Promise<any> {
//     try {
//       const accessToken = authorization.replace('Bearer ', '');
//       const userDetails = await this.userService.getUserDetails(accessToken);

//       logObject('userDetail:', userDetails);
//       return SuccessAPIResponse(userDetails);

//       // return userDetails;
//     } catch (error) {
//       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//     }
//   }

//   @Get('/check-username')
//   // async checkUsernameDuplication(@Param('username') username: string) {
//   async checkUsernameDuplication(@Query('username') username: string) {
//     console.log('api called');
//     // return SuccessAPIResponse({ status: 'available' }, 200);

//     const ret = await this.userService.findByUsername(username);
//     logObject('ret', ret);

//     if (ret) {
//       const v = FailureAPIResponse('username already exist');
//       logObject('return', v);
//       return v;
//     }

//     const v = SuccessAPIResponse();
//     logObject('return', v);
//     return v;
//   }

//   @Get('/check-phone')
//   async checkPhoneDuplication(@Query('phone') phone: string) {
//     console.log('api called');

//     // return SuccessAPIResponse({ status: 'available' }, 200);

//     const ret = await this.userService.findByPhone(phone);
//     logObject('ret', ret);

//     if (ret) {
//       const v = FailureAPIResponse('phone already exist');
//       logObject('return', v);
//       return v;
//     }

//     const v = SuccessAPIResponse();
//     logObject('return', v);
//     return v;
//   }

//   @Patch('/update-password')
//   async updatePassword(@Body() body: { username: string; password: string }) {
//     const ret = await this.userService.updatePassword(
//       body.username,
//       body.password,
//     );
//     return SuccessAPIResponse(ret);
//   }

//   // ADMIN
//   // 모든 User 가져오기 (Admin)
//   // @Serialize(CustomResponse<User[]>)
//   @ApiOperation({ summary: 'Admin, Get all users' })
//   @Get()
//   async getAllUsers() {
//     const users = await this.userService.getAll();
//     // return SuccessAPIResponse<UserDto[]>(users);
//     return SuccessAPIResponse(users);
//   }

//   // id 로 특정 User 가져오기

//   @Get('/:id')
//   async getById(@Param('id') id: string) {
//     const user = await this.userService.findByUserId(parseInt(id));
//     if (!user) {
//       throw new NotFoundException('user not found');
//     }
//     // return user;
//     // return { response: SuccessAPIResponse(user) };
//     return SuccessAPIResponse(user);
//   }

//   // id 로 User 제거,
//   @Delete('/:id')
//   async removeUser(
//     @Param('id') id: string,
//     @Headers('authorization') authorizationHeader: string,
//   ) {
//     const accessToken = authorizationHeader.replace('Bearer ', '');
//     await this.authService.verifyAccessToken(accessToken);
//     await this.authService.removeRefreshToken(parseInt(id));
//     await this.userService.remove(parseInt(id));
//     return SuccessAPIResponse();
//   }

//   extractAccessToken = (text) => {
//     return text.replace('Bearer ', '');
//   };

//   // user_id 로  genres 가져오기
//   @ApiOperation({ summary: "Get user's favorite genres " })
//   @Get('/:id/genres')
//   // @SerializeUserGenreDTO)
//   async getGenres(@Param('id') id: string) {
//     const ret = await this.userGenreService.getGenresByUserId(parseInt(id));
//     return SuccessAPIResponse(ret);
//   }

//   @ApiOperation({ summary: 'Remove user_genre' })
//   @Delete('/:id/genre/:genre_id')
//   async deleteUserGenre(
//     @Param('id') id: string,
//     @Param('genre_id') genre_id: string,
//   ) {
//     const ret = await this.userGenreService.delete(
//       parseInt(id),
//       parseInt(genre_id),
//     );
//     return SuccessAPIResponse(ret);
//   }

//   // 특정 유저가 올린 모든 surveys 가져오기!
//   @ApiOperation({ summary: 'Get all surveys posted by the user' })
//   @Get('/:id/posted-surveys')
//   async getPostedSurveys(@Param('id') id: string) {
//     const ret = await this.postingService.getPostedSurveyIdsByUserId(
//       parseInt(id),
//     );
//     return SuccessAPIResponse(ret);
//   }

//   @ApiOperation({ summary: "Get user's participated survey " })
//   @Get('/:id/participated-surveys')
//   async getParticipatedSurveys(@Param('id') id: string) {
//     const ret =
//       await this.participatingService.getParticipatedSurveyIdsByUserId(
//         parseInt(id),
//       );
//     return SuccessAPIResponse(ret);
//   }

//   @Patch('/:id/home/:geo_id?') // nullable
//   async setHomeAddress(
//     @Param('id') id: string,
//     @Param('geo_id') geo_id: string | null,
//   ) {
//     const geoId = geo_id ? parseInt(geo_id) : null;
//     const ret = await this.userService.setHomeAddress(parseInt(id), geoId);
//     return SuccessAPIResponse(ret);
//   }

//   @Patch('/:id/office/:geo_id?')
//   async setOfficeAddress(
//     @Param('id') id: string,
//     @Param('geo_id') geo_id: string | null,
//   ) {
//     const geoId = geo_id ? parseInt(geo_id) : null;
//     const ret = await this.userService.setOfficeAddress(parseInt(id), geoId);
//     return SuccessAPIResponse(ret);
//   }

//   @Post('/send-mail')
//   async sendMail(@Body() body: { username: string }) {
//     await this.authService.sendVerificationCodeMail(body.username);
//   }

//   @Post('/send-sms')
//   async sendSMS(@Body() body: { username: string; phone: string }) {
//     logObject('sendSMS body:', body);
//     const ret = await this.authService.sendVerificationCodeSMSForId(
//       body.username,
//       body.phone,
//     );

//     if (ret) {
//       return SuccessAPIResponse();
//     } else {
//       return FailureAPIResponse();
//     }
//   }

//   @Post('/verify-email')
//   async verifyEmail(@Body() body: { username: string; code: string }) {
//     const ret = await this.authService.verifyMailCode(body.username, body.code);
//     if (ret) {
//       return SuccessAPIResponse();
//     }
//     return FailureAPIResponse();
//   }

//   @Post('/verify-sms')
//   async verify(@Body() body: { username: string; code: string }) {
//     const ret = await this.authService.verifyMailCode(body.username, body.code);
//     if (ret) {
//       return SuccessAPIResponse();
//     }
//     return FailureAPIResponse();
//   }
// }

import { CustomApiResponse } from '../util/api-response';
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
  Query,
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

import { FailureAPIResponse, SuccessAPIResponse } from '../util/api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
import { AuthMiddleware } from 'src/auth.middleware';
import logObject from 'src/util/logObject';
import { MailService } from 'src/mail/mail.service';

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
    private readonly mailService: MailService,
  ) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'created description',
  })
  @ApiBadRequestResponse({
    description: 'bad Request Response try again',
  })
  async createUser(@Body() body: CreateUserDTO) {
    const user = await this.authService.signup(
      body.username,
      body.password,
      body.phone_number,
      body.birth_date,
      body.is_male,
    );
    const userId = user.id;
    const accessToken = await this.authService.generateAccessToken(userId);
    const refreshToken = await this.authService.generateRefreshToken(userId);
    const ret = { accessToken, refreshToken, userId };
    return SuccessAPIResponse(ret, 201);
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDTO) {
    try {
      const user = await this.authService.validateUser(
        body.username,
        body.password,
      );

      const [removeToken, result] = await Promise.all([
        this.authService.removeRefreshToken(user.id),
        this.authService.publishTokens(user.id),
      ]);
      return SuccessAPIResponse(result);
    } catch (error) {
      return FailureAPIResponse(error.message);
    }
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

  @Post('/phone-number/duplicate')
  async checkDuplicatePhoneNumber(@Body() body: { phone: string }) {
    const isAvailable = await this.authService.isAvailablePhoneNumber(
      body.phone,
    );

    if (isAvailable) {
      return SuccessAPIResponse();
    }
    return FailureAPIResponse();
  }

  @Post('/check-username-phone')
  async checkUsernamePhone(@Body() body: { phone: string; username: string }) {
    try {
      const isValid = await this.authService.validateUsernamePhone(
        body.username,
        body.phone,
      );
      return SuccessAPIResponse();
    } catch (error) {
      return FailureAPIResponse();
    }
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

      logObject('userDetail:', userDetails);
      return SuccessAPIResponse(userDetails);

      // return userDetails;
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('/check-username')
  async checkUsernameDuplication(@Query('username') username: string) {
    console.log('api called');
    // return SuccessAPIResponse({ status: 'available' }, 200);

    const ret = await this.userService.findByUsername(username);
    logObject('ret', ret);

    if (ret) {
      const v = FailureAPIResponse('username already exist');
      logObject('return', v);
      return v;
    }

    const v = SuccessAPIResponse();
    logObject('return', v);
    return v;
  }

  @Get('/check-phone')
  async checkPhoneDuplication(@Query('phone') phone: string) {
    console.log('api called');

    // return SuccessAPIResponse({ status: 'available' }, 200);

    const ret = await this.userService.findByPhone(phone);
    logObject('ret', ret);

    if (ret) {
      const v = FailureAPIResponse('phone already exist');
      logObject('return', v);
      return v;
    }

    const v = SuccessAPIResponse();
    logObject('return', v);
    return v;
  }

  @Patch('/update-password')
  async updatePassword(@Body() body: { username: string; password: string }) {
    const ret = await this.userService.updatePassword(
      body.username,
      body.password,
    );
    return SuccessAPIResponse(ret);
  }

  // ADMIN
  // 모든 User 가져오기 (Admin)
  // @Serialize(CustomResponse<User[]>)
  @ApiOperation({ summary: 'Admin, Get all users' })
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAll();
    // return SuccessAPIResponse<UserDto[]>(users);
    return SuccessAPIResponse(users);
  }

  // id 로 특정 User 가져오기

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.findByUserId(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // return user;
    // return { response: SuccessAPIResponse(user) };
    return SuccessAPIResponse(user);
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

  extractAccessToken = (text) => {
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
  async getPostedSurveys(@Param('id') id: string) {
    const ret = await this.postingService.getPostedSurveyIdsByUserId(
      parseInt(id),
    );
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: "Get user's participated survey " })
  @Get('/:id/participated-surveys')
  async getParticipatedSurveys(@Param('id') id: string) {
    const ret =
      await this.participatingService.getParticipatedSurveyIdsByUserId(
        parseInt(id),
      );
    return SuccessAPIResponse(ret);
  }

  @Patch('/:id/home/:geo_id?') // nullable
  async setHomeAddress(
    @Param('id') id: string,
    @Param('geo_id') geo_id: string | null,
  ) {
    const geoId = geo_id ? parseInt(geo_id) : null;
    const ret = await this.userService.setHomeAddress(parseInt(id), geoId);
    return SuccessAPIResponse(ret);
  }

  @Patch('/:id/office/:geo_id?')
  async setOfficeAddress(
    @Param('id') id: string,
    @Param('geo_id') geo_id: string | null,
  ) {
    const geoId = geo_id ? parseInt(geo_id) : null;
    const ret = await this.userService.setOfficeAddress(parseInt(id), geoId);
    return SuccessAPIResponse(ret);
  }

  @Post('/send-mail')
  async sendMail(@Body() body: { username: string }) {
    // return this.authService.sendMail();
    // const code = 'asdasd';
    // await this.mailService.sendAuthEmail('dmammmm@naver.com', code);
    await this.authService.sendVerificationCodeMail(body.username);
  }

  @Post('/find-password/send-sms')
  async sendSMS(@Body() body: { username: string; phone: string }) {
    // return this.authService.sendMail();
    // const code = 'asdasd';
    // await this.mailService.sendAuthEmail('dmammmm@naver.com', code);
    // await this.authService.sendVerificationCodeMail(body.username);
    logObject('sendSMS body:', body);
    const ret = await this.authService.sendVerificationCodeSMSForPassword(
      body.username,
      body.phone,
    );

    if (ret) {
      return SuccessAPIResponse();
    }

    return FailureAPIResponse();
  }

  @Post('/find-id/send-sms')
  async sendSMSForId(@Body() body: { phone: string }) {
    // 존재하지 않으면?
    const hasMatchingId = await this.userService.findByPhone(body.phone);

    if (hasMatchingId) {
      const ret = await this.authService.sendVerificationCodeSMSForId(
        body.phone,
      );

      if (ret) {
        return SuccessAPIResponse();
      }
      return FailureAPIResponse();
    }
    return FailureAPIResponse('일치하는 유저가 없습니다.');
  }

  @Post('/find-id/verify-sms')
  async verifySMS(@Body() body: { phone: string; code: string }) {
    const ret = await this.authService.verifyFindIdCode(body.phone, body.code);
    if (ret) {
      // return ID
      const user = await this.userService.findByPhone(body.phone);
      return SuccessAPIResponse(user.username);
      // return SuccessAPIResponse(ID)
    } else {
      return FailureAPIResponse('cannot find id with phone');
    }
  }

  @Post('/find-password/verify-email')
  async verifyEmail(@Body() body: { username: string; code: string }) {
    const ret = await this.authService.verifyMailCode(body.username, body.code);
    if (ret) {
      return SuccessAPIResponse();
    }
    return FailureAPIResponse();
  }

  @Post('/find-password/verify-sms')
  async verify(@Body() body: { username: string; code: string }) {
    const ret = await this.authService.verifyMailCode(body.username, body.code);
    if (ret) {
      return SuccessAPIResponse();
    }
    return FailureAPIResponse();
  }
}
