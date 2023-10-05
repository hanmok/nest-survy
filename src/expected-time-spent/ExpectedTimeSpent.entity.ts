import { QuestionType } from 'src/util/QuestionType';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ExpectedTimeSpent {
  @Column()
  question_type_id: number;

  @Column()
  time_take_in_sec: number;

  //   @Column()
  @PrimaryColumn()
  id: number;
}
