import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserGeo {
  @PrimaryColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  geo_id: number;

  @Column()
  geo_code: number;
}
