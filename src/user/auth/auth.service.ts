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
import { MailService } from 'src/mail/mail.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    private readonly mailService: MailService,
  ) {}

  generateRandomSixDigit = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return String(randomNumber);
  };

  // email, verification Code
  private readonly verificationCodes = new Map<string, string>();

  async sendVerificationCodeMail(email: string): Promise<void> {
    const verificationCode = this.generateRandomSixDigit();
    //메모리에 저장
    this.verificationCodes.set(email, verificationCode);
    // 메일 전송
    await this.mailService.sendAuthEmail(email, verificationCode);
  }

  async verifyMailCode(email: string, code: string): Promise<boolean> {
    const storedCode = this.verificationCodes.get(email);
    if (storedCode && storedCode === code) {
      this.verificationCodes.delete(email);
      return true;
    }
    return false;
  }

  async sendVerificationCodeSMSForId(receiver: string): Promise<boolean> {
    const verificationCode = this.generateRandomSixDigit();
    //메모리에 저장
    const receiverPhone = receiver.replaceAll('-', '');
    this.verificationCodes.set(receiverPhone, verificationCode);

    const ret = await this.mailService.sendAuthSMS(
      receiverPhone,
      `${verificationCode}`,
    );

    return ret;
  }

  async verifyFindIdCode(phone: string, code: string): Promise<boolean> {
    const receiverPhone = phone.replaceAll('-', '');
    const storedCode = this.verificationCodes.get(receiverPhone);

    if (storedCode && storedCode === code) {
      this.verificationCodes.delete(receiverPhone);
      return true;
    }
    return false;
  }

  async sendVerificationCodeSMSForPassword(
    email: string,
    receiver: string,
  ): Promise<boolean> {
    //메모리에 저장
    const verificationCode = this.generateRandomSixDigit();
    this.verificationCodes.set(email, verificationCode);

    const receiverPhone = receiver.replace('-', '');
    console.log(`sending message to ${receiverPhone}`);
    const ret = await this.mailService.sendAuthSMS(
      receiverPhone,
      `${verificationCode}`,
    );

    logObject('sms ret', ret);

    return ret;
    // 메일 전송
    // await this.mailService.sendAuthEmail(email, verificationCode);
  }

  async generateAccessToken(userId: number) {
    let payload: any = { userId };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
    });

    return accessToken;
  }

  async regenerateAccessToken(refreshToken: string) {
    const sth = this.verifyRefreshToken(refreshToken);
  }

  async publishTokens(userId) {
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
    const expiration = new Date(currentDate);
    expiration.setMonth(currentDate.getMonth() + 6);
    console.log('expiration', expiration);

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
    try {
      // DB 에서 확인
      const validToken = await this.refreshTokenRepo.findOne({
        where: { token },
      });
      if (!validToken) return new UnauthorizedException();

      const _ = this.jwtService.verify(token, {
        secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
      });
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserIdFromRefreshToken(token: string) {
    const validToken = await this.refreshTokenRepo.findOne({
      where: { token },
    });

    if (!validToken) return new UnauthorizedException();

    try {
      const _ = this.jwtService.verify(token, {
        secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
      });
      return validToken.user_id;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async verifyAccessToken(token: string): Promise<number> {
    try {
      const user = this.jwtService.verify(token, {
        secret: '046e13dae9c744286aea80fc54f6f203b1a15e36',
      });
      if (typeof user['userId'] === 'number') {
        return user['userId'];
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
    // return { userId: user['userId'] };
  }

  /** 존재하면 false, 없으면 true  */
  async isAvailableUsername(username: string) {
    const exist = await this.userRepo.findOne({ where: { username } });
    return exist === null;
  }

  async isAvailablePhoneNumber(phoneNumber: string) {
    const exist = await this.userRepo.findOne({
      where: { phone_number: phoneNumber },
    });

    return exist === null;
  }

  // TODO: 더 많은 정보들 들어가야함.
  // async signup(username: string, password: string) {
  // 폰 중복체크해야함.
  async signup(
    username: string,
    password: string,
    phoneNumber: string,
    birthDate: string,
    isMale: number,
  ) {
    try {
      const users = await this.userRepo.find({ where: { username } });
      if (users.length) {
        throw new BadRequestException('username in use');
      }

      const passwordSalt = randomBytes(8).toString('hex');
      const passwordHash = (await scrypt(password, passwordSalt, 32)) as Buffer;
      const passwordResult = passwordSalt + '.' + passwordHash.toString('hex');

      // const phoneSalt = randomBytes(8).toString('hex');
      // const phoneHash = (await scrypt(phoneNumber, phoneSalt, 32)) as Buffer;
      // const phoneResult = phoneSalt + '.' + phoneHash.toString('hex');

      const user = this.userRepo.create({
        username,
        password: passwordResult,
        phone_number: phoneNumber,
        is_male: isMale,
        birth_date: birthDate,
      });

      const _ = await this.userRepo.save(user);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeRefreshToken(userId: number) {
    await this.refreshTokenRepo.delete({ user_id: userId });
  }

  async validateUser(username: string, password: string) {
    console.log(`signing username: ${username}, password: ${password}`);
    const [user] = await this.userRepo.find({ where: { username } });

    if (!user) throw new NotFoundException('User not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('잘못된 아이디 또는 비밀번호 입니다.');
    }
    return user;
  }

  async validateUsernamePhone(username: string, phone: string) {
    const [user] = await this.userRepo.find({
      where: { username, phone_number: phone },
    });
    logObject('validateUsernamePhone user,', user);
    if (!user) {
      throw new NotFoundException('Invalid username or phone-number');
    }
    return user;
  }
}
