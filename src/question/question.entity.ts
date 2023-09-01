import { Optional } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionType } from 'src/util/questionType';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: number;

  @Column()
  survey_id: number;

  // Optional
  @Optional()
  @Column()
  text: string;

  @Column()
  expected_time_in_sec: number;

  // @Column()
  // correctAnswer: number;

  @Column()
  section_id: number;

  @Column()
  required: number;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  question_type: QuestionType;
}
