import { Module } from '@nestjs/common';
import { SectionBridgeService } from './section-bridge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionBridge } from './section-bridge.entity';
import { SectionBridgeController } from './section-bridge.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    SectionBridge
  ])],
  providers: [SectionBridgeService],
  controllers: [SectionBridgeController]
})
export class SectionBridgeModule {}
