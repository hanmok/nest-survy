import { UserGenreService } from './user_genre.service';
import { UserGenreDTO } from './userGenre.dto';
export declare class UserGenreController {
    private userGenreService;
    constructor(userGenreService: UserGenreService);
    create(body: UserGenreDTO): Promise<import("../util/api-response.model").CustomApiResponse<import("./user_genre.entity").UserGenre>>;
}
