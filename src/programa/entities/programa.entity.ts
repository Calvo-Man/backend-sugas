/* eslint-disable prettier/prettier */
import { Competencia } from "src/competencia/entities/competencia.entity";
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index("IDX_PROGRAMA_CODIGO", ["codigo"], { unique: true })
export class Programa {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 80, unique: true })
    nombre: string;
  
    @Column({ length: 20,unique: true })
    codigo: string;

    @Column()
    version: number;
  
    @ManyToMany(() => Competencia, competencia => competencia.programas)
    @JoinTable()
    competencias: Competencia[];
}
