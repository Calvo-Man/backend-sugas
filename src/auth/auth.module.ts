/* eslint-disable prettier/prettier */
import { jwtConstants } from './constans/jwt.constans';
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { UserModule } from "src/user/user.module";
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
   
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
    UserModule,
    RolesModule
    ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthGuardModule {}
