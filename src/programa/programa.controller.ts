/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/role-guard/role-guard.guard';
import { Roles } from 'src/roles/decorator/role.decorator';

@UseGuards(AuthGuard,RolesGuard)
@Controller('programa')
export class ProgramaController {
  constructor(private readonly programaService: ProgramaService) {}
  
  @Roles('admin')
  @Post('CrearPrograma')
  create(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programaService.create(createProgramaDto);
  }

  @Get()
  @Roles('admin','instructor')
  findAll() {
    return this.programaService.findAll();
  }

  @Get('codigo/:id')
  @Roles('admin','instructor')
  findOne(@Param('id') id: string) {
    return this.programaService.findOne(id);
  }
  @Get(':id/competencias')
  @Roles('admin','instructor')
  async getCompetenciasPorPrograma(@Param('id') programaId: string) {
    return this.programaService.getCompetenciasPorPrograma(+programaId);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProgramaDto: UpdateProgramaDto) {
    return this.programaService.update(+id, updateProgramaDto);
  }

  @Delete('codigo/:id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.programaService.remove(id);
  }
}
