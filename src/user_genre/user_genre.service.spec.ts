import { Test, TestingModule } from '@nestjs/testing';
import { UserGenreService } from './user_genre.service';

describe('UserGenreService', () => {
  let service: UserGenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGenreService],
    }).compile();

    service = module.get<UserGenreService>(UserGenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
