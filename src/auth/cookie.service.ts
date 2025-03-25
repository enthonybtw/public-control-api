import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { JwtokenService } from "src/jwtoken/jwtoken.service";

@Injectable()
export class CookieService {
  constructor(private jwtokenService: JwtokenService) {}
  static tokenKey = "access-token";

  setToken(response: Response, token: string) {
    response.cookie(CookieService.tokenKey, token, {
      httpOnly: true,
      maxAge: 4 * 60 * 60 * 1000,
    });
  }
  async removeToken(response: Response) {
    this.jwtokenService.blockJwt(response.cookie[CookieService.tokenKey]);
    response.clearCookie(CookieService.tokenKey);
  }
}
