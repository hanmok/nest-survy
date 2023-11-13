import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geo } from './geo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeoService {
  constructor(@InjectRepository(Geo) private repo: Repository<Geo>) {}

  async getAllGeoInfos() {
    const geos = await this.repo.find();
    return geos;
  }
}
