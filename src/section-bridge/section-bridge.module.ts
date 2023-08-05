import { Module } from '@nestjs/common';
import { SectionBridgeService } from './section-bridge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionBridge } from './section-bridge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    SectionBridge
  ])],
  providers: [SectionBridgeService]
})
export class SectionBridgeModule {}
