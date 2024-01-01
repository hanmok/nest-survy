import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_number: string;

  @Column()
  bank_name: string;

  @Column()
  holder_name: string;

  @Column()
  created_at: string;

  @Column()
  amount: number;

  @Column()
  user_id: number;

  @Column()
  approved: number;
}
