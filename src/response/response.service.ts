import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './response.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResponseService {
	constructor(@InjectRepository(Response) private repo: Repository<Response>) {}
}
