import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionBridge } from './section-bridge.entity';
import { Repository } from 'typeorm';
import { CreateSectionBridgeDTO } from './createSectionBridge.dto';

@Injectable()
export class SectionBridgeService {
	constructor(@InjectRepository(SectionBridge) private repo: Repository<SectionBridge>) { }

	async create(body: CreateSectionBridgeDTO) { 
		const sectionBridge = this.repo.create(body)
		return this.repo.save(sectionBridge)
	}
	
	async getByCurrentId(current_id: number) { 
		return await this.repo.findOneBy({current_id})
	}
}
