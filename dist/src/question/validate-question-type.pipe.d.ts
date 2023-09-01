import { PipeTransform } from '@nestjs/common';
import { CreateQuestionDTO } from './createQuestion.dto';
export declare class ValidateQuestionTypePipe implements PipeTransform {
    transform(value: CreateQuestionDTO): CreateQuestionDTO;
}
