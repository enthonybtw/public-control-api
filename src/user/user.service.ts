import { Injectable } from "@nestjs/common";
import { $Enums } from "@prisma/client";
import { AccountService } from "src/account/account.service";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UserService {
  constructor(
    private databaseService: DatabaseService,
    private accountService: AccountService
  ) {}

  findByToken(token: string) {
    return this.databaseService.user.findFirst({ where: { token } });
  }

  async create(
    token: string,
    password: string,
    username: string,
    position: $Enums.Roles
  ) {
    const user = await this.databaseService.user.create({
      data: { token, password },
    });

    await this.accountService.createAccount(user.id, username, position);

    return user;
  }

  delete(id: number) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
