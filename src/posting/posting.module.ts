import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posting } from './posting.entity';
import { PostingService } from './posting.service';
import { PostingController } from './posting.controller';

// @Module({TypeOrmModule})
@Module({
	imports: [TypeOrmModule.forFeature([Posting])], 
	providers: [PostingService], controllers: [PostingController],
})
export class PostingModule {}
