import { Injectable } from "@nestjs/common";
import { PatchAccountBodyDto } from "./account.dto";
import { DatabaseService } from "src/database/database.service";
import { $Enums } from "@prisma/client";

@Injectable()
export class AccountService {
  constructor(private databaseService: DatabaseService) {}

  async createAccount(
    userId: number,
    username: string,
    position: $Enums.Roles
  ) {
    return this.databaseService.account.create({
      data: {
        ownerId: userId,
        username: username,
        position: position,
        online: 0,
      },
    });
  }

  async getAccount(userId: number) {
    return await this.databaseService.account.findFirstOrThrow({
      where: { ownerId: userId },
    });
  }

  async patchAccount(userId: number, patch: PatchAccountBodyDto) {
    return this.databaseService.account.update({
      where: { ownerId: userId },
      data: { ...patch },
    });
  }
}
