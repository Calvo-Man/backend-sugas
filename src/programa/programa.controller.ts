/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Controller('programa')
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) {}

  @Post('CrearPrograma')
  create(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programaService.create(createProgramaDto);
  }

  @Get()
  findAll() {
    return this.programaService.findAll();
  }

  @Get('codigo/:id')
  findOne(@Param('id') id: string) {
    return this.programaService.findOne(id);
  }
  @Get(':id/competencias')
  async getCompetenciasPorPrograma(@Param('id') programaId: string) {
    return this.programaService.getCompetenciasPorPrograma(+programaId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramaDto: UpdateProgramaDto) {
    return this.programaService.update(+id, updateProgramaDto);
  }

  @Delete('codigo/:id')
  remove(@Param('id') id: string) {
    return this.programaService.remove(id);
  }
}
