import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participating {
  // @PrimaryColumn()

  @PrimaryColumn()
  id: number;

  @Column()
  user_id: number; //fk

  @Column()
  survey_id: number; // fk

  @Column()
  created_at: string;

  @Column()
  sequence: number;

  @Column()
  is_honest: number;
}
