import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { SectionBridge } from '../section-bridge/section-bridge.entity';
import { SectionBridgeService } from '../section-bridge/section-bridge.service';
import { Question } from '../question/question.entity';
import { SelectableOption } from '../selectable-option/selectable-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Section,
      SectionBridge,
      Question,
      SelectableOption,
    ]),
  ],
  providers: [SectionService, SectionBridgeService],
  controllers: [SectionController],
})
export class SectionModule {}
