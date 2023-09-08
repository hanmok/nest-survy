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
  // three consists of Primary Key
  // question_id
  // selectableOption_id
  // user_id

  @PrimaryColumn()
  // @OneToOne(() => Question)
  // @JoinColumn()
  // question_id: number;
  question_id: number;

  @PrimaryColumn()
  // @OneToOne(() => SelectableOption)
  // @JoinColumn()
  // selectableOption_id: number;
  selectable_option_id: number;

  @PrimaryColumn()
  // @OneToOne(() => User)
  // @JoinColumn()
  // user_id: number;
  user_id: number;

  @PrimaryColumn()
  // @OneToOne(() => Survey)
  // @JoinColumn()
  // survey_id: number;
  survey_id: number;

  @Column()
  answer_text: string;

  @Column()
  time_took_in_sec: number;
}
