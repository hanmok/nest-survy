import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { SectionBridge } from 'src/section-bridge/section-bridge.entity';
import { SectionBridgeService } from 'src/section-bridge/section-bridge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Section, SectionBridge])],
  providers: [SectionService, SectionBridgeService],
  controllers: [SectionController]
})
export class SectionModule {}
