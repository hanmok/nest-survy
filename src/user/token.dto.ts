import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDTO {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  refreshToken: string;
}
