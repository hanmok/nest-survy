import { Test, TestingModule } from '@nestjs/testing';
import { UserGenreController } from './user_genre.controller';

describe('UserGenreController', () => {
  let controller: UserGenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGenreController],
    }).compile();

    controller = module.get<UserGenreController>(UserGenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
