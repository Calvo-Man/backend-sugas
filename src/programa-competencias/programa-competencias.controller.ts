/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramaCompetenciasService } from './programa-competencias.service';
import { CreateProgramaCompetenciaDto } from './dto/create-programa-competencia.dto';
import { UpdateProgramaCompetenciaDto } from './dto/update-programa-competencia.dto';

@Controller('programa-competencias')
export class ProgramaCompetenciasController {
  constructor(private readonly programaCompetenciasService: ProgramaCompetenciasService) {}

  @Post()
  create(@Body() createProgramaCompetenciaDto: CreateProgramaCompetenciaDto) {
    return this.programaCompetenciasService.create(createProgramaCompetenciaDto);
  }

  @Get()
  findAll() {
    return this.programaCompetenciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programaCompetenciasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramaCompetenciaDto: UpdateProgramaCompetenciaDto) {
    return this.programaCompetenciasService.update(+id, updateProgramaCompetenciaDto);
  }

  @Delete(':id/competencia/:idCompetencia')
  remove(@Param('id') idPrograma: string, @Param(
    'idCompetencia',
  ) idCompetencia: string,) {
    return this.programaCompetenciasService.removeCompetencia(+idPrograma, +idCompetencia);
  }
}
