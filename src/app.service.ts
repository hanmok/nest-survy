import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QuestionPair } from './util/questionPair';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
  // getHello(): string {
  getHello() {
    const returnValue = 'Hello world!!!';
    console.log(returnValue);
    return returnValue;
  }
}
