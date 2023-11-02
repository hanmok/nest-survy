import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SurveyGeo {
  @PrimaryColumn()
  id: number;

  @Column()
  survey_id: number;

  @Column()
  geo_id: number;

  @Column()
  geo_code: number;
}
