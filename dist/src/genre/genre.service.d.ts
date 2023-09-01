import { Genre } from './genre.entity';
import { Repository } from 'typeorm';
export declare class GenreService {
    private repo;
    constructor(repo: Repository<Genre>);
    create(name: string): Promise<Genre>;
    findOne(id: number): Promise<Genre>;
    getAll(): Promise<Genre[]>;
}
