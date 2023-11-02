import { Module } from '@nestjs/common';
import { UserGeoService } from './user_geo.service';

@Module({
  providers: [UserGeoService]
})
export class UserGeoModule {}
