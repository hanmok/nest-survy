import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }

  getDatabaseName(): string { 
    return this.configService.get<string>('DATABASE_NAME')
  }
  getHello(): string {
    return 'Hello World!';
  }
}
