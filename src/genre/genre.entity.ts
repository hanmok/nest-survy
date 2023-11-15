import { Survey } from 'src/survey/survey.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Survey, (survey) => survey.genres)
  surveys: Survey[];
}
