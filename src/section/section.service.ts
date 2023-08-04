import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { Repository } from 'typeorm';
import { CreateSectionDTO } from './createSection.dto';

@Injectable()
export class SectionService {
	constructor(@InjectRepository(Section) 
	private repo: Repository<Section>) {}

	
	async getAllSections() { 
		return this.repo.find()
	}

	async createSection(body: CreateSectionDTO) { 
		const section = await this.repo.create(body)
		return await this.repo.save(section)
	}

	async findSection(id: number) { 
		const section = await this.repo.findOneBy({id})
		return section
	}
}
