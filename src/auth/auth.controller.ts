import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import {
  GetSessionResponseDto,
  SignInBodyDto,
  SignUpBodyDto,
} from "./auth.dto";
import { CookieService } from "./cookie.service";
import { AuthGuard } from "./auth.guard";
import { SessionDC } from "./session.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private cookieService: CookieService
  ) {}

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async signUp(
    @Body() body: SignUpBodyDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken } = await this.authService.signUp(
      body.token,
      body.password,
      body.username,
      body.position
    );

    this.cookieService.setToken(response, accessToken);
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async signIn(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken } = await this.authService.signIn(
      body.token,
      body.password
    );

    this.cookieService.setToken(response, accessToken);
  }

  @Post("sign-out")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) response: Response) {
    this.cookieService.removeToken(response);
  }

  @Get("session")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GetSessionResponseDto })
  @UseGuards(AuthGuard)
  getSession(@SessionDC() session: GetSessionResponseDto) {
    return session;
  }
}
