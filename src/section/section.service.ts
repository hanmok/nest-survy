import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
	constructor(@InjectRepository(Section) private repo: Repository<Section>) {}
}
