import { Module } from '@nestjs/common';
import { ProgramasInstructorService } from './programas-instructor.service';
import { ProgramasInstructorController } from './programas-instructor.controller';
import { UserModule } from 'src/user/user.module';
import { ProgramaModule } from 'src/programa/programa.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    
    UserModule,
    ProgramaModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ProgramasInstructorController],
  providers: [ProgramasInstructorService],
  exports: [ProgramasInstructorService],
})
export class ProgramasInstructorModule {}
