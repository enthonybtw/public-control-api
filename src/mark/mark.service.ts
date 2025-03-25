import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class MarkService {
  constructor(private databaseService: DatabaseService) {}

  create() {}

  delete() {}

  patch() {}

  get() {}

  async check(arg: number | string) {
    if (typeof arg === "string") {
      const body = await this.databaseService.mark.findFirst({
        where: { name: arg },
        select: { departmentId: true },
      });

      return body ? body.departmentId : null;
    }

    return null;
  }
}
