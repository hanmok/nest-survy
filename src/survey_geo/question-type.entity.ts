import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class QuestionType {
  @PrimaryColumn()
  id: number;

  @Column()
  question_id: number;
}
