import { IsOptional } from 'class-validator';
// import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  current_participation: number;

  @Column()
  participation_goal: number;

  @Column()
  title: string;

  @Column()
  // reward_range: string;
  reward: number;

  @Column()
  is_completed: number;

  @Column()
  is_public: number;

  @Column()
  code: string;

  // @ManyToMany(() => User, (user) => user.surveys)
  // @JoinTable()
  // users: User[];

  @Column()
  initial_section_id: number | undefined;

  @Column()
  expected_time_in_sec: number;

  @Column()
  geo_code: number;

  @Column()
  target_min_age: number;

  @Column()
  taret_max_age: number;

  // @Column()
  // created_at

  // @Column()
  // ended_at
}
