import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserGenreService } from './user_genre.service';
import { UserGenreDTO } from './userGenre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from '../api-response.model';

import { SuccessAPIResponse } from '../util/success-api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';

@ApiTags('UserGenre')
@Controller('user-genre')
@UseInterceptors(ToCamelCaseInterceptor)
export class UserGenreController {
  constructor(private userGenreService: UserGenreService) {}

  @ApiOperation({ summary: 'Create User_genre' })
  @Post()
  async create(@Body() body: UserGenreDTO) {
    const ret = await this.userGenreService.create(body.user_id, body.genre_id);
    return SuccessAPIResponse(ret, 201);
  }
}
