import { Question } from '../question/question.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SelectableOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_id: number;

  @Column()
  position: number;

  @Column()
  value: string;

  @Column()
  section_id: number;

  @Column()
  is_extra: number;
}
