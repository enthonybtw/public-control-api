import {
  ArgumentsHost,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  GoneException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CookieService } from "./cookie.service";
import { JwtService } from "@nestjs/jwt";
import { JwtokenService } from "src/jwtoken/jwtoken.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(CookieService) private cookieService: CookieService,
    @Inject(JwtokenService) private tokenService: JwtokenService
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const token = request.cookies[CookieService.tokenKey];

    if (!token) {
      throw new UnauthorizedException();
    }

    const jwtBlockState = await this.tokenService.getJwt(token);

    if (jwtBlockState?.block) {
      const response = context.switchToHttp().getResponse() as Response;
      this.cookieService.removeToken(response);
      return false;
    }

    try {
      const session = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request["session"] = session;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
