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

  @Column()
  survey_id: number;

  @Column()
  sequence: number;

  @Column()
  expected_time_in_sec: number;

  @Column()
  title: string;
}
