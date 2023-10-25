import { OnModuleDestroy } from '@nestjs/common';
import { getConnection } from 'typeorm';

export class AppModule implements OnModuleDestroy {
  async onModuleDestroy() {
    const connection = getConnection();
    await connection.close();
  }
}
