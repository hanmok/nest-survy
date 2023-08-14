import { Question } from 'src/question/question.entity';
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
  // @OneToOne(() => Question)
  // @JoinColumn()
  question_id: number;

  @Column()
  position: number;

  @Column()
  value: string;
}
