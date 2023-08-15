import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CustomApiResponse } from './api-response.model';

export class CustomResponse<T> {
  @ApiProperty()
  @Expose()
  statusCode: number;

  @ApiProperty()
  @Expose()
  message: string;

  @ApiProperty()
  @Expose()
  data?: T;
}
