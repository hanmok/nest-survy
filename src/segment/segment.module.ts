import { Module } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from './segment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Segment])],
  providers: [SegmentService],
  controllers: [SegmentController]
})
export class SegmentModule {}
