import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: string;

  @Column()
  amount: number;

  @Column()
  user_id: number;

  @Column()
  approved: number;
}
