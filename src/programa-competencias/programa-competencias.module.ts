/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProgramaCompetenciasService } from './programa-competencias.service';
import { ProgramaCompetenciasController } from './programa-competencias.controller';
import { ProgramaModule } from 'src/programa/programa.module';
import { CompetenciaModule } from 'src/competencia/competencia.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from 'src/programa/entities/programa.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Programa]),
    ProgramaModule,
    CompetenciaModule
  ],
  controllers: [ProgramaCompetenciasController],
  providers: [ProgramaCompetenciasService],
})
export class ProgramaCompetenciasModule {}
