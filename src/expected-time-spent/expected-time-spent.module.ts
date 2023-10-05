import { Module } from '@nestjs/common';
import { ExpectedTimeSpentService } from './expected-time-spent.service';
import { ExpectedTimeSpentController } from './expected-time-spent.controller';

@Module({
  providers: [ExpectedTimeSpentService],
  controllers: [ExpectedTimeSpentController]
})
export class ExpectedTimeSpentModule {}
