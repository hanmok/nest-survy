import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participating {
  @PrimaryColumn()
  section_id: number;

  @PrimaryColumn()
  user_id: number; //fk

  @PrimaryColumn()
  survey_id: number; // fk

  @Column()
  created_at: string;
}
