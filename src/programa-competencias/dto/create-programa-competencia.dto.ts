/* eslint-disable prettier/prettier */


import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProgramaCompetenciaDto {

    @IsNumber()
    @IsNotEmpty()
    programa : number

    @IsArray()
    @IsNotEmpty()
    competencia: number[]
    
}
