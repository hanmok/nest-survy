// not used yet

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { QuestionType } from 'src/util/QuestionType';
import { CreateQuestionDTO } from './createQuestion.dto';

@Injectable()
export class ValidateQuestionTypePipe implements PipeTransform {
  transform(value: CreateQuestionDTO) {
    if (!Object.values(QuestionType).includes(value.question_type)) {
      throw new BadRequestException(
        `Invalid Question Type: ${value.question_type}`,
      );
    }
    return value;
  }
}
