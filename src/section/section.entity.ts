import { Survey } from '../survey/survey.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign Key
  // @Column()
  // @OneToOne(() => Survey)
  // @JoinColumn()

  @Column()
  survey_id: number;

  @Column()
  expected_time_in_sec: number;

  // @Column()
  // reward: number;

  @Column()
  title: string;

  @Column()
  sequence: number;
}
