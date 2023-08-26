import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { SectionBridge } from 'src/section-bridge/section-bridge.entity';
import { SectionBridgeService } from 'src/section-bridge/section-bridge.service';
import { Question } from 'src/question/question.entity';
import { SelectableOption } from 'src/selectable-option/selectable-option.entity';

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
