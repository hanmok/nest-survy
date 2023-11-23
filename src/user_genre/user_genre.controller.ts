import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserGenreService } from './user_genre.service';
import { UserGenreDTO } from './userGenre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from '../api-response.model';

import { SuccessAPIResponse } from '../util/api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
import { GenreService } from 'src/genre/genre.service';
import logObject from 'src/util/logObject';

@ApiTags('UserGenre')
@Controller('user-genre')
@UseInterceptors(ToCamelCaseInterceptor)
export class UserGenreController {
  constructor(
    private userGenreService: UserGenreService,
    private genreService: GenreService,
  ) {}

  @ApiOperation({ summary: 'Create User_genre' })
  @Post()
  async create(@Body() body: UserGenreDTO) {
    const ret = await this.userGenreService.create(body.user_id, body.genre_id);
    return SuccessAPIResponse(ret, 201);
  }

  // AccessToken 만으로도 가능한거 아니야? 맞아.
  @ApiOperation({ summary: 'Get UserGenre using userId' })
  @Get('/user/:user_id')
  async getUserGenres(@Param('user_id') user_id: string) {
    const userGenres = await this.userGenreService.getGenresByUserId(
      parseInt(user_id),
    );
    const genreIds = new Set(userGenres.map((ug) => ug.genre_id));

    const correspondingGenres = (await this.genreService.getAll()).filter(
      (genre) => genreIds.has(genre.id),
    );

    return SuccessAPIResponse(correspondingGenres);
  }

  @Delete('/user/:user_id/genre/:genre_id')
  async deleteUserGenre(
    @Param('user_id') user_id: string,
    @Param('genre_id') genre_id: string,
  ) {
    const ret = await this.userGenreService.delete(
      parseInt(user_id),
      parseInt(genre_id),
    );
    return SuccessAPIResponse(ret);
  }

  @Delete('/user/:user_id')
  async deleteUserGenreAtOnce(@Param('user_id') user_id: string) {
    const ret = await this.userGenreService.deleteByUserId(parseInt(user_id));
    return SuccessAPIResponse(ret);
  }

  @Post('/user/:user_id/genres')
  async updateUserGenres(
    @Param('user_id') user_id: string,
    @Body() body: { genre_ids: number[] },
  ) {
    logObject('input genre_ids: ', body.genre_ids);
    await this.userGenreService.deleteByUserId(parseInt(user_id));
    const userId = parseInt(user_id);
    const promises = Array.from(body.genre_ids).map(async (genre_id) => {
      this.userGenreService.create(userId, genre_id);
    });
    await Promise.all(promises);
    return SuccessAPIResponse();
  }
}
