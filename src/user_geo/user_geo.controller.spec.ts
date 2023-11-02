import { Test, TestingModule } from '@nestjs/testing';
import { UserGeoController } from './user_geo.controller';

describe('UserGeoController', () => {
  let controller: UserGeoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGeoController],
    }).compile();

    controller = module.get<UserGeoController>(UserGeoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
