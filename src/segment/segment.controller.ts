import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Segment')
@Controller('segment')
export class SegmentController {}
