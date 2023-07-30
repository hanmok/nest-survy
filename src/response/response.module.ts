import { Response } from './response.entity';
import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  providers: [ResponseService],
  controllers: [ResponseController]
})
export class ResponseModule {}
