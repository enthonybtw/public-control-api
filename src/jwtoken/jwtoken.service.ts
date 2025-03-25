import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class JwtokenService {
  constructor(private databaseService: DatabaseService) {}

  async addJwt(owner: number, jwt: string) {
    return this.databaseService.$transaction([
      this.databaseService.jwtTokens.updateMany({
        where: { ownerId: owner, block: false },
        data: { block: true },
      }),
      this.databaseService.jwtTokens.create({ data: { ownerId: owner, jwt } }),
    ]);
  }

  async blockJwt(token: string) {
    return this.databaseService.jwtTokens.updateMany({
      where: { jwt: token },
      data: { block: true },
    });
  }

  async getJwt(jwt: string) {
    return this.databaseService.jwtTokens.findFirst({
      where: { jwt },
    });
  }
}
