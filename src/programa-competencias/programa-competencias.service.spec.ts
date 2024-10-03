import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaCompetenciasService } from './programa-competencias.service';

describe('ProgramaCompetenciasService', () => {
  let service: ProgramaCompetenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramaCompetenciasService],
    }).compile();

    service = module.get<ProgramaCompetenciasService>(ProgramaCompetenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
