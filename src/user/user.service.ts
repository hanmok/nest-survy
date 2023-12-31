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

import { SuccessAPIResponse } from '../util/api-response';
import { UserDto } from './dtos/user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { access } from 'fs';
import { decode } from 'punycode';
import logObject from 'src/util/logObject';
import { Geo } from 'src/geo/geo.entity';
import { GeoService } from 'src/geo/geo.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserDetailDto } from './dtos/userDetail.dto';
const scrypt = promisify(_scrypt);

// interface UserDetail {
//   collected_reward: number;
//   birth_date: Date | null;
//   age: number | null;
//   is_male: number | null;
//   reputation: number;
//   fatigue: number;
//   home_address: Geo | null;
//   office_address: Geo | null;
//   // num_of_participation: number;
// }

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private dataSource: DataSource,
    private configService: ConfigService,
    private jwtService: JwtService,
    private geoService: GeoService,
  ) {}

  async getUserDetails(accessToken: string) {
    console.log('passed accessToken', accessToken);
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
      });

      const userId = decoded.userId;
      const response = await this.findByUserId(userId);

      // const result: UserDetail = {
      const result: UserDetailDto = {
        collected_reward: response.collected_reward,
        birth_date: response.birth_date.toISOString(),
        age: response.age,
        is_male: response.is_male,
        reputation: response.reputation,
        fatigue: response.fatigue,
        home_address: null,
        office_address: null,
        // num_of_participation: null
      };
      console.log('returning birthDate', response.birth_date.toISOString());

      if (response.home_address || response.office_address) {
        const allGeos = await this.geoService.getAllGeoInfos();
        if (response.home_address) {
          const correspondingGeoInfo = allGeos.find(
            (geo) => geo.id === response.home_address,
          );
          result.home_address = correspondingGeoInfo;
        }
        if (response.office_address) {
          const correspondingGeoInfo = allGeos.find(
            (geo) => geo.id === response.office_address,
          );
          result.office_address = correspondingGeoInfo;
        }
      }

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

  async findByPhone(phone: string) {
    return await this.repo.findOneBy({ phone_number: phone });
  }

  async findByUsername(username: string) {
    // return await this.repo.find({ where: { username } });
    return await this.repo.findOneBy({ username });
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

  async setHomeAddress(userId: number, geoId: number) {
    const user = await this.repo.findOneBy({ id: userId });
    user.home_address = geoId;
    return this.repo.save(user);
  }

  async setOfficeAddress(userId: number, geoId: number) {
    const user = await this.repo.findOneBy({ id: userId });
    user.office_address = geoId;
    return this.repo.save(user);
  }

  async updatePassword(username: string, password: string) {
    const user = await this.repo.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    user.password = result;
    const _ = await this.repo.save(user);
    return user;
  }
}
