import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { $Enums } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { MarkService } from "src/mark/mark.service";

@Injectable()
export class UnitService {
  constructor(
    private databaseService: DatabaseService,
    private markService: MarkService
  ) {}

  async create(mark: string, operation: $Enums.Operation, comment?: string) {
    if (await this.check(mark)) {
      throw new ConflictException(`Юнит: ${mark} уже существует`);
    }

    const department = await this.markService.check(mark);
    if (!department) {
      throw new BadRequestException(`Маркировка не существует: ${mark}`);
    }

    return await this.databaseService.unit.create({
      data: { mark, department, operation, comment },
    });
  }

  async delete(ids: number[]) {
    return await this.databaseService.unit.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async patch(
    ids: number[],
    mark?: string,
    operation?: $Enums.Operation,
    comment?: string,
    channelId?: number,
    incidentId?: number
  ) {
    if (
      mark === undefined &&
      operation === undefined &&
      comment === undefined &&
      channelId === undefined &&
      incidentId === undefined
    ) {
      throw new BadRequestException(`Хотя бы одно поле должно быть заполнено`);
    }

    if (ids.length > 1) {
      if (comment !== undefined || mark !== undefined) {
        throw new BadRequestException(`Поля "comment" / "mark" уникальны`);
      }
    }

    const department =
      mark !== undefined ? await this.markService.check(mark) : undefined;

    if (department !== undefined && !department) {
      throw new BadRequestException(`Маркировка не существует: ${mark}`);
    } else if (department && mark !== undefined) {
      if (await this.check(mark)) {
        throw new ConflictException(`Юнит: ${mark} уже существует`);
      }
    }

    if (incidentId !== undefined) {
      // проверка - существует ли инцидент
    } else if (channelId !== undefined) {
      // проверка - существует ли канал
    }

    return await this.databaseService.unit.updateManyAndReturn({
      where: {
        id: { in: ids },
      },
      data: {
        mark,
        department,
        operation,
        comment,
        tacticalId: channelId,
        incidentId,
      },
    });
  }

  async get(id?: number) {
    if (id === undefined) {
      return await this.databaseService.unit.findMany({});
    } else {
      const unit = await this.databaseService.unit.findFirst({ where: { id } });
      if (!unit) {
        throw new BadRequestException("Такого юнита не существует");
      }

      return unit;
    }
  }

  async check(value: number | string) {
    if (typeof value === "string") {
      const query = await this.databaseService.unit.findFirst({
        where: { mark: value },
      });

      return query ? true : false;
    } else if (typeof value === "number") {
      const query = await this.databaseService.unit.findFirst({
        where: { id: value },
      });

      return query ? true : false;
    } else {
      throw new BadRequestException(`Field "value" should be completed!`);
    }
  }
}
