import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CustomAnswer {
  @PrimaryColumn()
  @ApiProperty()
  selectable_option_id: number;

  @PrimaryColumn()
  @ApiProperty()
  user_id: number;

  @PrimaryColumn()
  @ApiProperty()
  sequence: number;

  @Column({ default: 0 })
  @ApiProperty()
  answer_text: string;
}
