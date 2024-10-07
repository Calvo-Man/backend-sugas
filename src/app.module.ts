/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramaModule } from './programa/programa.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompetenciaModule } from './competencia/competencia.module';

import { ResultadosModule } from './resultados/resultados.module';
import { ProgramaCompetenciasModule } from './programa-competencias/programa-competencias.module';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';

import { AuthGuardModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'gguias',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}'
      ],
      synchronize: true,
    }),
    ProgramaModule,
    CompetenciaModule,
    ResultadosModule,
    ProgramaCompetenciasModule,
    UserModule,
    RolesModule,
    AuthGuardModule,
    AuthGuardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
