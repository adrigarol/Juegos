import { Test, TestingModule } from '@nestjs/testing';
import { PublicoController } from './publico.controller';

describe('PublicoController', () => {
  let controller: PublicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicoController],
    }).compile();

    controller = module.get<PublicoController>(PublicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
