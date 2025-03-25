import { Injectable } from "@nestjs/common";
import { AccountService } from "src/account/account.service";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class LoggingService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly accountService: AccountService
  ) {}

  async log(
    request: object,
    response: object,
    user: any,
    ip: string,
    date: number,
    exec: string
  ) {
    const username =
      user !== null ? await this.accountService.getAccount(user.id) : null;

    // const username = await this.accountService.getAccount()
  }

  transcription() {}
}
