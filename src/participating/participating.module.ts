import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participating } from './participating.entity';
import { ParticipatingService } from './participating.service';

@Module({
	imports: [TypeOrmModule.forFeature([Participating])],
	providers: [ParticipatingService]
})
export class ParticipatingModule {}

