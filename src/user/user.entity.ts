import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
// import { RefreshToken } from './jwt/refreshToken.entity';
import { RefreshToken } from './refreshToken.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Survey } from 'src/survey/survey.entity';
// import { Survey } from '../survey/survey.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'username' })
  @Column()
  username: string;

  @ApiProperty({ description: 'hashed user password' })
  @Column()
  password: string;

  @Column({ default: 0 })
  collected_reward: number; // Int

  @Column()
  phone_number: string;

  // optional
  @Column()
  birth_date: Date;

  @Column()
  age: number;

  // optional
  @Column()
  is_male: number;

  @Column({ default: 0 })
  reputation: number;

  @Column()
  fatigue: number;

  @Column()
  home_address: number;

  @Column()
  office_address: number;

  @ManyToMany(() => Survey)
  @JoinTable({
    name: 'participating',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'survey_id', referencedColumnName: 'id' },
  })
  participated_surveys: Survey[];
}
