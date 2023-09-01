import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { AccessToken } from '../accessToken.entity';
import { RefreshToken } from '../refreshToken.entity';
export declare class AuthService {
    private readonly jwtService;
    private userRepo;
    private accessTokenRepo;
    private refreshTokenRepo;
    constructor(jwtService: JwtService, userRepo: Repository<User>, accessTokenRepo: Repository<AccessToken>, refreshTokenRepo: Repository<RefreshToken>);
    generateAccessToken(userId: number): Promise<string>;
    generateRefreshToken(userId: number): Promise<string>;
    verifyRefreshToken(token: string): Promise<number>;
    verifyAccessToken(token: string): Promise<{
        accessToken: any;
    }>;
    signup(username: string, password: string): Promise<User>;
    removeTokens(userId: number): Promise<void>;
    removeAccessToken(userId: number): Promise<void>;
    userHasToken(userId: number): Promise<RefreshToken[]>;
    signin(username: string, password: string): Promise<User>;
}
