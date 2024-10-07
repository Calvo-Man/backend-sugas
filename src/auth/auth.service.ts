import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
    private readonly JwtService:JwtService

  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.userService.findByEmail(registerAuthDto.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const role = await this.rolesService.findOne(registerAuthDto.role);
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    const hashedPassword = await bcryptjs.hash(registerAuthDto.password, 10);

    return await this.userService.create({
      ...registerAuthDto,
      password: hashedPassword,
    });
  }

  async login(loginAuthDto: LoginAuthDto) {
   
    const user = await this.userService.findByEmail(loginAuthDto.email);
    
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordValid = await bcryptjs.compare(
      loginAuthDto.password,
      user.password,
    );
    
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      rol: user.role.rol_name,
    };
    const token = await this.JwtService.signAsync(payload);
    if (!token) {
      throw new BadRequestException('Invalid credentials');
    }
    return {
      access_token: token,
      rol:payload.rol
    };

  }
}
