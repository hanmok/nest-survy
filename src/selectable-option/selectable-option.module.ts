import { Module } from '@nestjs/common';
import { SelectableOptionController } from './selectable-option.controller';
import { SelectableOptionService } from './selectable-option.service';

@Module({
  controllers: [SelectableOptionController],
  providers: [SelectableOptionService]
})
export class SelectableOptionModule {}
