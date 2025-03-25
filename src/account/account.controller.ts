import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { AccountDto, PatchAccountBodyDto } from "./account.dto";
import { AccountService } from "./account.service";
import { AuthGuard } from "src/auth/auth.guard";
import { SessionDC } from "src/auth/session.decorator";
import { GetSessionResponseDto } from "src/auth/auth.dto";

@Controller("account")
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch("patch")
  @ApiOkResponse({ type: AccountDto })
  async patchAccount(
    @Body() body: PatchAccountBodyDto,
    @SessionDC() session: GetSessionResponseDto
  ): Promise<AccountDto> {
    return this.accountService.patchAccount(session.id, body);
  }

  @Post("get")
  @ApiOkResponse({ type: AccountDto })
  @HttpCode(HttpStatus.OK)
  async getAccount(
    @SessionDC() session: GetSessionResponseDto
  ): Promise<AccountDto> {
    return await this.accountService.getAccount(session.id);
  }
}
