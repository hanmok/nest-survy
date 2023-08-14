import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Posting {
  @PrimaryColumn()
  survey_id: number; // fk

  @PrimaryColumn()
  user_id: number; // fk
}
