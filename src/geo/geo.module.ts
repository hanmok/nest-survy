import { Module } from '@nestjs/common';
import { GeoService } from './geo.service';
import { GeoController } from './geo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geo } from './Geo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Geo])],
  providers: [GeoService],
  controllers: [GeoController],
})
export class GeoModule {}
