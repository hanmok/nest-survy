import { Question } from '../question/question.entity';
import { SelectableOption } from '../selectable-option/selectable-option.entity';
import { Survey } from '../survey/survey.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_id: number;

  @Column()
  selectable_option_id: number;

  @Column()
  user_id: number;

  @PrimaryColumn()
  survey_id: number;

  @Column()
  answer_text?: string;
}
