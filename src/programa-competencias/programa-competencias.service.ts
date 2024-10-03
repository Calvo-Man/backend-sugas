/* eslint-disable prettier/prettier */
import { ProgramaService } from './../programa/programa.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateProgramaCompetenciaDto } from './dto/update-programa-competencia.dto';
import { CompetenciaService } from 'src/competencia/competencia.service';
import { Repository } from 'typeorm';
import { Programa } from 'src/programa/entities/programa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProgramaCompetenciaDto } from './dto/create-programa-competencia.dto';

@Injectable()
export class ProgramaCompetenciasService {

  constructor(
    @InjectRepository(Programa) 
    private programaRepository: Repository<Programa>,
    private programaService: ProgramaService,
    private competenciaService: CompetenciaService

  ) {}
  async create(createProgramaCompetenciaDto: CreateProgramaCompetenciaDto) {
    // Buscar el programa por ID
    const programa = await this.programaService.findOneById(createProgramaCompetenciaDto.programa);
    
    if (!programa) {
      throw new NotFoundException(`Programa con ID ${createProgramaCompetenciaDto.programa} no encontrado`);
    }
  
    // Obtener las competencias solicitadas
    const competencias = await this.competenciaService.findByIds(createProgramaCompetenciaDto.competencia);
  
    if (!competencias || competencias.length === 0) {
      throw new NotFoundException(`Competencias con ID ${createProgramaCompetenciaDto.competencia} no encontradas`);
    }
  
    // Verificar si ya existe alguna de las competencias asignadas al programa
    const competenciasExistentes = programa.competencias || [];
    
    competencias.forEach((nuevaCompetencia) => {
      if (competenciasExistentes.some(competencia => competencia.id === nuevaCompetencia.id)) {
        throw new ConflictException(`La competencia con ID ${nuevaCompetencia.id} ya está relacionada con el programa con ID ${createProgramaCompetenciaDto.programa}`);
      }
    });
  
    // Combinar las competencias existentes con las nuevas
    programa.competencias = [...competenciasExistentes, ...competencias];
  
    // Cargar el programa con las competencias combinadas
    const programaCompetencia = await this.programaRepository.preload({
      id: programa.id, // Preload busca el registro por su ID
      competencias: programa.competencias, // Asigna las competencias combinadas
    });
  
    if (!programaCompetencia) {
      throw new NotFoundException(`No se pudo encontrar el programa con ID ${programa.id} para actualizar.`);
    }
  
    // Guardar el programa con las nuevas competencias
    return await this.programaRepository.save(programaCompetencia);
  }
  

  async findAll() {
    return await this.programaRepository.find({ relations: ['competencias'] });
  }

  async findOne(id: number) {
    const programa = await this.programaRepository.findOne({ where: { id }, relations: ['competencias'] });
    if (!programa) {
      throw new NotFoundException(`Programa con ID ${id} no encontrado`);
    }
    return programa;
    
  }

  async update(id: number, updateProgramaCompetenciaDto: UpdateProgramaCompetenciaDto) {
    const programa = await this.programaRepository.findOne({ where: { id }, relations: ['competencias'] });
    if (!programa) {
      throw new NotFoundException(`Programa con ID ${id} no encontrado`);
    }
    const competencias = await this.competenciaService.findByIds(updateProgramaCompetenciaDto.competencia);
    if (!competencias || competencias.length === 0) {
      throw new NotFoundException(`Competencias con ID ${updateProgramaCompetenciaDto.competencia} no encontradas`);
    }
    const competenciasExistentes = programa.competencias || [];
    competencias.forEach((nuevaCompetencia) => {
      if (competenciasExistentes.some(competencia => competencia.id === nuevaCompetencia.id)) {
        throw new ConflictException(`La competencia con ID ${nuevaCompetencia.id} ya está relacionada con el programa con ID ${id}`);
      }
    });
    programa.competencias = [...competenciasExistentes, ...competencias];
    return this.programaRepository.save(programa);
  }

  async removeCompetencia(idPrograma: number, idCompetencia: number) {
    const programa = await this.programaRepository.findOne({ where: { id: idPrograma }, relations: ['competencias'] });
    if (!programa) {
      throw new NotFoundException(`Programa con ID ${idPrograma} no encontrado`);
    }
    const competenciaEncontrada = programa.competencias.find(competencia => competencia.id === idCompetencia);
    if (!competenciaEncontrada) {
      throw new NotFoundException(`Competencia con ID ${idCompetencia} no se encuentra relacionada con el programa con ID ${idPrograma}`);
    }
    programa.competencias = programa.competencias.filter(competencia => competencia.id !== idCompetencia);
    await this.programaRepository.save(programa);
    return "Se elimino la competencia con ID " + idCompetencia + " del programa con ID " + idPrograma;
  }
}
