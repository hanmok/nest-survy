import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posting } from './posting.entity';
import { PostingService } from './posting.service';

// @Module({TypeOrmModule})
@Module({
	imports: [TypeOrmModule.forFeature([Posting])], 
	providers: [PostingService],
})
export class PostingModule {}
