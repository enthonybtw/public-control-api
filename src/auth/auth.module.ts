import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { CookieService } from "./cookie.service";
import { JwtokenModule } from "src/jwtoken/jwtoken.module";
import { JwtokenService } from "src/jwtoken/jwtoken.service";

@Global()
@Module({
  providers: [AuthService, CookieService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtokenModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "4h" },
    }),
  ],
  exports: [CookieService],
})
export class AuthModule {}
