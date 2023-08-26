import { IsOptional } from 'class-validator';
import { User } from 'src/user/user.entity';
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
  reward_range: string;

  @Column()
  is_completed: number;

  @Column()
  is_public: number;

  @Column()
  code: string;

  @ManyToMany(() => User, (user) => user.surveys)
  @JoinTable()
  users: User[];

  @Column()
  initial_section_id: number | undefined;

  // @Column()
  // created_at

  // @Column()
  // ended_at
}
