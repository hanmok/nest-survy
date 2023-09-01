import { CustomApiResponse } from 'src/util/api-response.model';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { AuthService } from './auth/auth.service';
import { UserDto } from './dtos/user.dto';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { PostingService } from 'src/posting/posting.service';
import { ParticipatingService } from 'src/participating/participating.service';
import { User } from './user.entity';
import { ApiResponseService } from 'api-response.service';
export declare class UserController {
    private userService;
    private authService;
    private userGenreService;
    private postingService;
    private participatingService;
    private readonly apiResponseService;
    constructor(userService: UserService, authService: AuthService, userGenreService: UserGenreService, postingService: PostingService, participatingService: ParticipatingService, apiResponseService: ApiResponseService);
    createTwo(): Promise<void>;
    createUser(body: CreateUserDTO): Promise<CustomApiResponse<{
        accessToken: string;
        refreshToken: string;
        userId: number;
    }>>;
    publishTokens(userId: any): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: any;
    }>;
    login(body: CreateUserDTO): Promise<CustomApiResponse<{
        accessToken: string;
        refreshToken: string;
        userId: any;
    }>>;
    logout(id: string): Promise<CustomApiResponse<unknown>>;
    autoSignin(body: {
        refreshToken: string;
    }): Promise<CustomApiResponse<{
        accessToken: string;
        userId: number;
    }>>;
    getAllUsers(): Promise<CustomApiResponse<UserDto[]>>;
    getById(id: string): Promise<{
        response: CustomApiResponse<User>;
    }>;
    removeUser(id: string): Promise<CustomApiResponse<unknown>>;
    getGenres(id: string): Promise<CustomApiResponse<import("../user_genre/user_genre.entity").UserGenre[]>>;
    deleteUserGenre(id: string, genre_id: string): Promise<CustomApiResponse<void>>;
    getPostedSurveys(id: string): Promise<CustomApiResponse<import("../posting/posting.entity").Posting[]>>;
    getParticipatedSurveys(id: string): Promise<CustomApiResponse<number[]>>;
}
