import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserDto } from './dtos/user.dto';
export declare class UserService {
    private repo;
    private dataSource;
    private configService;
    constructor(repo: Repository<User>, dataSource: DataSource, configService: ConfigService);
    getDBConfiguration(): Promise<{
        host: string;
        port: number;
        username: string;
        password: string;
    }>;
    createTwo(email: string, password: string): Promise<void>;
    create(username: string, password: string): Promise<User>;
    update(id: number, attrs: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
    findByUserId(id: number): Promise<User>;
    findByUsername(username: string): Promise<User[]>;
    getAll(): Promise<UserDto[]>;
}
