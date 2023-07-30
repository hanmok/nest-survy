import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Segment } from './segment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SegmentService { 
	constructor(@InjectRepository(Segment) private repo: Repository<Segment>){}
}
