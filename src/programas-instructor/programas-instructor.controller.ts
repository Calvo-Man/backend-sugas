import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramasInstructorService } from './programas-instructor.service';
import { CreateProgramasInstructorDto } from './dto/create-programas-instructor.dto';
import { UpdateProgramasInstructorDto } from './dto/update-programas-instructor.dto';

@Controller('programas-instructor')
export class ProgramasInstructorController {
  constructor(private readonly programasInstructorService: ProgramasInstructorService) {}

  @Post()
  async create(@Body() createProgramasInstructorDto: CreateProgramasInstructorDto) {
    return await this.programasInstructorService.AsignarProgramasAInstructor(createProgramasInstructorDto);
  }

  @Get()
  findAll() {
    return this.programasInstructorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programasInstructorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramasInstructorDto: UpdateProgramasInstructorDto) {
    return this.programasInstructorService.update(+id, updateProgramasInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programasInstructorService.remove(+id);
  }
}
