import { UserGenre } from './user_genre.entity';
import { Repository } from 'typeorm';
export declare class UserGenreService {
    private repo;
    constructor(repo: Repository<UserGenre>);
    getGenresByUserId(user_id: number): Promise<UserGenre[]>;
    create(user_id: number, genre_id: number): Promise<UserGenre>;
    delete(user_id: number, genre_id: number): Promise<void>;
}
