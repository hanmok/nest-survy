import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeoService } from './geo.service';
import { SuccessAPIResponse } from 'src/util/api-response';

@ApiTags('Geo')
@Controller('/geo')
export class GeoController {
  constructor(private geoService: GeoService) {}

  @Get()
  async getAll() {
    const geos = await this.geoService.getAllGeoInfos();
    return SuccessAPIResponse(geos);
  }
}
