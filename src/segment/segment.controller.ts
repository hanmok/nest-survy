import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CamelCaseInterceptor } from 'src/interceptors/camelCase.interceptor';

@ApiTags('Segment')
@Controller('segment')
@UseInterceptors(CamelCaseInterceptor)
export class SegmentController {}
