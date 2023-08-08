import { Module } from '@nestjs/common';
import { SelectableOptionController } from './selectable-option.controller';
import { SelectableOptionService } from './selectable-option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectableOption } from './selectable-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    SelectableOption
  ])],
  controllers: [SelectableOptionController],
  providers: [SelectableOptionService]
})
export class SelectableOptionModule {}
