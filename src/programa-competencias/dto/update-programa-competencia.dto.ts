import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaCompetenciaDto } from './create-programa-competencia.dto';

export class UpdateProgramaCompetenciaDto extends PartialType(CreateProgramaCompetenciaDto) {}
