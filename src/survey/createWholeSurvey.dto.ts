import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSurveyDTO } from './createSurvey.dto';
import { CreateSectionDTO } from 'src/section/createSection.dto';
import { CreateQuestionDTO } from 'src/question/createQuestion.dto';
import { CreateSelectableOptionDTO } from 'src/selectable-option/createSelectableOption.dto';

export class CreateWholeSurveyDTO {
  @ApiProperty()
  @Expose()
  //   createSurvey: CreateSurveyDTO;
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
}
