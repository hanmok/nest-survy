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
import { AccessToken } from './accessToken.entity';
import { ApiProperty } from '@nestjs/swagger';
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

  // optional
  @Column()
  birth_date: string;

  @Column()
  age: number;

  // optional
  @Column()
  is_male: number;

  @Column({ default: 0 })
  reputation: number;

  @Column()
  fatigue: number;

  // @ManyToMany(() => Survey, (survey) => survey.users)
  // @JoinTable()
  // surveys: Survey[];

  // @OneToOne(() => RefreshToken, refreshToken => refreshToken.user)
  // @JoinColumn()
  // @Column()
  // @Column()
  // @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user_id)
  // refreshToken: RefreshToken;

  // @Column()
  // @OneToOne(() => AccessToken, (accessToken) => accessToken.user_id)
  // accessToken: AccessToken; // 여기서 이 데이터가 왜 필요해?

  // @OneToOne(() => AccessToken, accessToken => accessToken.user)
  // @JoinColumn()
  // @Column()
  // accessToken: AccessToken;

  // fatigue // INT
  // DB 에 없음.
  // @Column({ default: 0})
  // creditAmount: number  // INT

  // birthdate // Date 보류 ;

  // @Column()
  // isMale: boolean; // TinyInt

  // @Column()
  // nickname: string;
  // registeredAt DATETIME
  // nickname VARCHAR(100)
}
