import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';

@ApiTags('Segment')
@Controller('segment')
@UseInterceptors(ToCamelCaseInterceptor)
export class SegmentController {}
