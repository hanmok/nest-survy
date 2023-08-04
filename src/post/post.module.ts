import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './postEntity';
import { PostService } from './post.service';

// @Module({TypeOrmModule})
@Module({
	imports: [TypeOrmModule.forFeature([PostEntity])], 
	providers: [PostService],
})
export class PostModule {}
