import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDTO } from './createGenre.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GenreDto } from './genre.dto';
import { SurveyGenreService } from '../survey_genre/survey_genre.service';
import { SurveyGenreDTO } from '../survey_genre/survey_genre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from '../api-response.model';
import { SuccessAPIResponse } from '../util/api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';

@ApiTags('Genre')
@Controller('/genre')
@UseInterceptors(ToCamelCaseInterceptor)
export class GenreController {
  constructor(
    private genreService: GenreService,
    private surveyGenreService: SurveyGenreService,
  ) {}

  @ApiOperation({ summary: 'Get All genres' })
  @Get()
  // @Serialize(GenreDto)
  async getAllGenres() {
    const ret = await this.genreService.getAll();
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: "Create genre, 'ADMIN'" })
  @Post()
  // @SerializeGenreDto)
  async createGenre(@Body() body: CreateGenreDTO) {
    console.log(body);
    const genre = await this.genreService.create(body.name);
    return SuccessAPIResponse(genre, 201);
  }

  @ApiOperation({ summary: 'Get Genre with id' })
  @Get('/:id')
  // @SerializeGenreDto)
  async getGenreById(@Param('id') id: string) {
    const genre = await this.genreService.findOne(parseInt(id));
    if (!genre) {
      throw new NotFoundException('genre not found');
    }
    return SuccessAPIResponse(genre);
  }

  @ApiOperation({ summary: 'Get All surveys having the genre ' })
  @Get('/:id/surveys')
  // @SerializeSurveyGenreDTO)
  async getSurveysByGenreId(@Param('id') id: string) {
    const surveyGenres = await this.surveyGenreService.getSurveysByGenreId(
      parseInt(id),
    );
    return SuccessAPIResponse(surveyGenres);
  }
}
