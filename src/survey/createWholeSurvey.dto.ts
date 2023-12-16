import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSurveyDTO } from './createSurvey.dto';
import { CreateSectionDTO } from 'src/section/createSection.dto';
import { CreateQuestionDTO } from 'src/question/createQuestion.dto';
import { CreateSelectableOptionDTO } from 'src/selectable-option/createSelectableOption.dto';
/** CreateSurveyDTO, CreateSectionDTO[], CreateQuestionDTO[], CreateSelectableOptionDTO[] */
export class CreateWholeSurveyDTO {
  @ApiProperty()
  @Expose()
  survey: CreateSurveyDTO;

  @ApiProperty()
  @Expose()
  sections: CreateSectionDTO[];

  @ApiProperty()
  @Expose()
  questions: CreateQuestionDTO[];

  @ApiProperty()
  @Expose()
  selectable_options: CreateSelectableOptionDTO[];

  // FIXME: array 이어야함..
  // @ApiProperty()
  // @Expose()
  // geo_code: number;

  // @ApiProperty()
  // @Expose()
  // target_min_age: number;

  // @ApiProperty()
  // @Expose()
  // target_max_age: number;

  // @ApiProperty()
  // @Expose()
  // genre_ids: number[];
}
