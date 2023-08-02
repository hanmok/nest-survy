import { Module } from '@nestjs/common';
import { SectionBridgeController } from './section-bridge.controller';
import { SectionBridgeService } from './section-bridge.service';

@Module({
  controllers: [SectionBridgeController],
  providers: [SectionBridgeService]
})
export class SectionBridgeModule {}
