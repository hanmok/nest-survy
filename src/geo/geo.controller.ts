import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeoService } from './geo.service';

@ApiTags('Geo')
@Controller('/geo')
export class GeoController {
  constructor(private geoService: GeoService) {}

  @Get()
  async getAll() {
    return this.geoService.getAllGeoInfos();
  }
}
