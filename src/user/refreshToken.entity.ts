import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { User } from "../user.entity";
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  // @OneToOne(() => User, user => user.refreshToken)
  user_id: number;

  @Column()
  expiration: Date;
}
