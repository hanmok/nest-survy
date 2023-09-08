// import { logObject } from './../../util/Log';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './user.entity';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { AccessToken } from '../accessToken.entity';
// import { RefreshToken } from '../jwt/refreshToken.entity';
import { RefreshToken } from '../refreshToken.entity';
// import { logObject } from 'src/util/log';
// import logObject from '../../util/logObject'
// import { logObject } from '../../logObject';
import logObject from '../../util/logObject';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(AccessToken)
    private accessTokenRepo: Repository<AccessToken>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async generateAccessToken(userId: number) {
    let payload: any = { userId };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });
    const newToken = this.accessTokenRepo.create({
      token: accessToken,
      user_id: userId,
    });
    const newAccessToken = await this.accessTokenRepo.save(newToken);
    // console.log(`newAccessToken saved: ${newAccessToken}`);
    logObject('newAccessToken saved', newAccessToken);
    return newAccessToken.token;
  }

  async generateRefreshToken(userId: number) {
    let payload: any = { userId };
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '60d',
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });
    // console.log(`payload: ${payload}, refreshToken: ${refreshToken}`)
    const newToken = this.refreshTokenRepo.create({
      token: refreshToken,
      user_id: userId,
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
    // 이거 넣어야함 ;;
    // if (!validToken) return new UnauthorizedException();
    const refreshToken = this.jwtService.verify(token, {
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });
    // return { refreshToken: refreshToken['refreshToken'] }
    return validToken.user_id;
  }

  async verifyAccessToken(token: string) {
    const accessToken = this.jwtService.verify(token, {
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });
    // DB 에서 확인 후 만료시키고 재발급

    // return accessToken
    return { accessToken: accessToken['accessToken'] };
  }

  async signup(username: string, password: string) {
    const users = await this.userRepo.find({ where: { username } });
    if (users.length) {
      throw new BadRequestException('username in use');
    }
    console.log(`creating username: ${username}, password: ${password}`);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    // const user = this.userService.create(username, result)
    const user = this.userRepo.create({ username, password: result });
    const _ = await this.userRepo.save(user);
    return user;
  }

  async removeTokens(userId: number) {
    await this.refreshTokenRepo.delete({ user_id: userId });
    await this.accessTokenRepo.delete({ user_id: userId });
  }

  async removeAccessToken(userId: number) {
    await this.accessTokenRepo.delete({ user_id: userId });
  }

  async userHasToken(userId: number) {
    const user1 = await this.refreshTokenRepo.find({
      where: { user_id: userId },
    });
    const user2 = await this.accessTokenRepo.find({
      where: { user_id: userId },
    });

    return user1 || user2;
  }

  async signin(username: string, password: string) {
    console.log(`signing username: ${username}, password: ${password}`);
    // const [user] = await this.userService.findByUsername(username);
    const [user] = await this.userRepo.find({ where: { username } });

    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
