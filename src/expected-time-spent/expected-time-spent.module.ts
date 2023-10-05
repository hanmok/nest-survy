import { Module } from '@nestjs/common';
import { ExpectedTimeSpentService } from './expected-time-spent.service';
import { ExpectedTimeSpentController } from './expected-time-spent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpectedTimeSpent } from './ExpectedTimeSpent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpectedTimeSpent])],
  providers: [ExpectedTimeSpentService],
  controllers: [ExpectedTimeSpentController],
})
export class ExpectedTimeSpentModule {}
