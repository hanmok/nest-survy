import { Module } from '@nestjs/common';
import { SelectableOptionController } from './selectable-option.controller';
import { SelectableOptionService } from './selectable-option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { selectableOption } from './selectable-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    selectableOption
  ])],
  controllers: [SelectableOptionController],
  providers: [SelectableOptionService]
})
export class SelectableOptionModule {}
