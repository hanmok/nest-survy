import { SectionBridge } from './section-bridge.entity';
import { Repository } from 'typeorm';
import { CreateSectionBridgeDTO } from './createSectionBridge.dto';
export declare class SectionBridgeService {
    private repo;
    constructor(repo: Repository<SectionBridge>);
    create(body: CreateSectionBridgeDTO): Promise<SectionBridge>;
    getByCurrentId(current_id: number): Promise<SectionBridge>;
}
