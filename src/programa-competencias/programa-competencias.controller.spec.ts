import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaCompetenciasController } from './programa-competencias.controller';
import { ProgramaCompetenciasService } from './programa-competencias.service';

describe('ProgramaCompetenciasController', () => {
  let controller: ProgramaCompetenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaCompetenciasController],
      providers: [ProgramaCompetenciasService],
    }).compile();

    controller = module.get<ProgramaCompetenciasController>(ProgramaCompetenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
