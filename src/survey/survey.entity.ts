import { IsOptional } from 'class-validator';
import { Genre } from 'src/genre/genre.entity';
import { Geo } from 'src/geo/geo.entity';
import { User } from 'src/user/user.entity';
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

  @Column()
  created_at: string;

  // @ManyToMany(() => User, (user) => user.surveys)
  // @JoinTable()
  // users: User[];

  @Column()
  expected_time_in_sec: number;

  @Column()
  target_min_age: number;

  @Column()
  target_max_age: number;

  @Column()
  cost: number;

  @Column()
  is_target_male: number;

  @Column()
  num_of_sections: number;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'survey_genre',
    joinColumn: { name: 'survey_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: Genre[];

  @ManyToMany(() => Geo)
  @JoinTable({
    name: 'survey_geo',
    joinColumn: { name: 'survey_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'geo_id', referencedColumnName: 'id' },
  })
  geos: Geo[];

  // TODO: Add survey_geos

  @ManyToMany(() => User, (user) => user.participated_surveys)
  participated_users: User[];
}
