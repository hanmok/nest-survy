import { JwtService } from '@nestjs/jwt';
import { config } from 'process';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
// import { SuccessAPIResponse } from '../api-response.model';

import { SuccessAPIResponse } from '../util/success-api-response';
import { UserDto } from './dtos/user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { access } from 'fs';
import { decode } from 'punycode';
import logObject from 'src/util/logObject';

interface UserDetail {
  collected_reward: number;
  birth_date: string | null;
  age: number | null;
  is_male: number | null;
  reputation: number;
  fatigue: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private dataSource: DataSource,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async getUserDetails(accessToken: string) {
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
      });

      const userId = decoded.userId;
      console.log('decoded userId: ', userId);
      const response = await this.findByUserId(userId);
      const result: UserDetail = {
        collected_reward: response.collected_reward,
        birth_date: response.birth_date,
        age: response.age,
        is_male: response.is_male,
        reputation: response.reputation,
        fatigue: response.fatigue,
      };

      logObject('user result', result);
      return result;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getDBConfiguration() {
    const dbHost = this.configService.get<string>('database.host');
    const dbPort = this.configService.get<number>('database.port');
    const dbUsername = this.configService.get<string>('database.username');
    const dbPassword = this.configService.get<string>('database.password');

    return {
      host: dbHost,
      port: dbPort,
      username: dbUsername,
      password: dbPassword,
    };
  }

  async create(username: string, password: string) {
    const user = this.repo.create({ username, password });
    return await this.repo.save(user);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findByUserId(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return await this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findByUserId(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.repo.remove(user);
  }

  async findByUserId(id: number) {
    if (!id) {
      return null;
    }
    return await this.repo.findOneBy({ id });
  }

  async findByUsername(username: string) {
    return await this.repo.find({ where: { username } });
  }

  async getAll() {
    const users = await this.repo.find();
    // return await this.repo.find()
    // return users.map(user => new UserDto(user))
    const dtos = plainToInstance(UserDto, users);

    // return plainToInstance(UserDto, users)
    // console.log(`dtos: ${dtos[0].}`)
    return dtos;
    // const allUsers = await this.repo.find()

    // return SuccessAPIResponse(allUsers, 200, "testing")
  }
}
