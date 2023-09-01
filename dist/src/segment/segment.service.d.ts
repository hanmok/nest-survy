import { Segment } from './segment.entity';
import { Repository } from 'typeorm';
export declare class SegmentService {
    private repo;
    constructor(repo: Repository<Segment>);
}
