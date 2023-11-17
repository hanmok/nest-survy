import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ToCamelCaseInterceptor } from 'src/interceptors/toCamelCase.interceptor';
import { PostingService } from './posting.service';
import { SuccessAPIResponse } from 'src/util/success-api-response';

@ApiTags('posting')
@Controller('/posting')
@UseInterceptors(ToCamelCaseInterceptor)
export class PostingController {
  constructor(private postingService: PostingService) {}

  @ApiOperation({ summary: 'Get all surveys posted by the user' })
  @Get('user/:id/posted-surveys')
  // // @SerializeSurveyDto)
  // @SerializePostingDTO)
  async getPostedSurveys(@Param('id') id: string) {
    console.log('getPostedSurveys called, id: ', id);
    const ret = await this.postingService.getPostedSurveyIdsByUserId(
      parseInt(id),
    );
    return SuccessAPIResponse(ret);
  }
}
