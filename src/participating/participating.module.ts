import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participating } from './participating.entity';
import { ParticipatingService } from './participating.service';
import { ParticipatingController } from './participating.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Participating])],
	providers: [ParticipatingService],
	controllers: [ParticipatingController]
})
export class ParticipatingModule {}

