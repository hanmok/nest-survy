import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from '../refreshToken.entity';
import logObject from '../../util/logObject';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async generateAccessToken(userId: number) {
    let payload: any = { userId };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });

    return accessToken;
  }

  async publishTokens(userId) {
    // refreshToken 이 존재할 시 제거
    await this.removeRefreshToken(userId);

    const accessToken = await this.generateAccessToken(userId);
    const refreshToken = await this.generateRefreshToken(userId);
    return { accessToken, refreshToken, userId };
  }

  async generateRefreshToken(userId: number) {
    let payload: any = { userId };
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '60d',
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });

    const currentDate = new Date();
    const expiration = currentDate.setMonth(currentDate.getMonth() + 6);

    const newToken = this.refreshTokenRepo.create({
      token: refreshToken,
      user_id: userId,
      expiration,
    });

    const newRefreshToken = await this.refreshTokenRepo.save(newToken);
    logObject('newRefreshToken saved:', newRefreshToken);
    return newRefreshToken.token;
    // return refreshToken
  }

  // DB 에서 token 있는지 검색, 없으면 Error!
  // 있으면 jwtService 를 통해 유효한지 확인
  // 유효하면 그대로 return

  async verifyRefreshToken(token: string) {
    const validToken = await this.refreshTokenRepo.findOne({
      where: { token },
    });

    if (!validToken) return new UnauthorizedException();
    const refreshToken = this.jwtService.verify(token, {
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });
    // return { refreshToken: refreshToken['refreshToken'] }
    return validToken.user_id;
  }

  async verifyAccessToken(token: string): Promise<number> {
    console.log('verifyAccessToken called, passed token:', token);
    const user = this.jwtService.verify(token, {
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });
    console.log('user', user);
    if (typeof user['userId'] === 'number') {
      return user['userId'];
    }
    // throw new Error('invalid accessToken');
    throw new UnauthorizedException();

    // return { userId: user['userId'] };
  }

  /** 존재하면 false, 없으면 true  */
  async isAvailableUsername(username: string) {
    const exist = await this.userRepo.findOne({ where: { username } });
    return exist === null;
  }

  async signup(username: string, password: string) {
    // TODO: Duplicate Check 만들기.
    const users = await this.userRepo.find({ where: { username } });
    if (users.length) {
      throw new BadRequestException('username in use');
    }
    console.log(`creating username: ${username}, password: ${password}`);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = this.userRepo.create({ username, password: result });
    const _ = await this.userRepo.save(user);
    return user;
  }

  async removeRefreshToken(userId: number) {
    await this.refreshTokenRepo.delete({ user_id: userId });
  }

  async signin(username: string, password: string) {
    console.log(`signing username: ${username}, password: ${password}`);
    const [user] = await this.userRepo.find({ where: { username } });

    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong password');
    }
    return user;
  }
}
