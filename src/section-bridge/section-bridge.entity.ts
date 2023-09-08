import { Question } from '../question/question.entity';
import { Section } from '../section/section.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class SectionBridge {
  @PrimaryColumn()
  // @OneToOne(() => Section)
  // @JoinColumn()
  current_id: number;

  @PrimaryColumn()
  // @OneToOne(() => Section)
  // @JoinColumn()
  next_id: number;

  @PrimaryColumn()
  // @OneToOne(() => Question)
  // @JoinColumn()
  question_id: number;

  @PrimaryColumn()
  selectable_option_id: number;
}
