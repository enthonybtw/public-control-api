import { BadRequestException, Injectable } from "@nestjs/common";
import { $Enums } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { ParseConnectedUnits } from "./parsing/connected-units.parse";
import { channel } from "diagnostics_channel";

@Injectable()
export class ChannelService {
  constructor(private databaseService: DatabaseService) {}

  // Admin' section
  create() {}

  manage() {}

  delete() {}

  // User' section
  async clear(ids: number[]) {
    if (ids.length === 0) {
      throw new BadRequestException("Укажите хотя-бы один канал");
    }

    await this.disconnect(ids, true);

    const channels = await this.databaseService.tactical.updateMany({
      where: { id: { in: ids } },
      data: { brief: null, description: null, status: null, commander: null },
    });

    return channels;
  }

  async edit(
    id: number,
    brief?: string,
    description?: string,
    status?: $Enums.TacticalStatus,
    commander?: number,
    units?: number[]
  ) {
    if ((await this.get(id)) === null) {
      throw new BadRequestException("Канала не существует");
    }

    const body = await this.databaseService.tactical.update({
      where: { id },
      data: {
        brief,
        description,
        status,
        commander,
      },
    });

    if (typeof units !== "undefined") {
      const connected = await this.databaseService.unit.findMany({
        where: { tacticalId: id },
        select: { id: true },
      });

      const previous = connected.map((value) => {
        return value.id;
      });

      const manage = await ParseConnectedUnits(previous, units);

      if (manage.action === true) {
        if (manage.toConnect && manage.toConnect?.length !== 0) {
          await this.connect(id, manage.toConnect, true);
        }

        if (manage.toDisconnect && manage.toDisconnect?.length !== 0) {
          await this.disconnect(manage.toDisconnect);
        }
      }
    }

    const connected = await this.databaseService.unit.findMany({
      where: { tacticalId: id },
      select: { id: true },
    });

    return {
      ...body,
      units: connected.map((value) => {
        return value.id;
      }),
    };
  }

  async connect(id: number, units: number[], ignore: boolean = false) {
    if (ignore === false && !(await this.get(id))) {
      throw new BadRequestException("Канала не существует");
    }

    if (units.length === 0) {
      throw new BadRequestException("Юниты не могут быть равны нулю");
    }

    return await this.databaseService.unit.updateMany({
      where: { id: { in: units } },
      data: {
        operation: $Enums.Operation.Channel,
        tacticalId: id,
        incidentId: null,
      },
    });
  }

  async disconnect(arg: number[], byChannel: boolean = false) {
    if (arg.length === 0) {
      throw new BadRequestException("Длина массива аргумента не равна 0");
    }

    if (byChannel) {
      const channels = arg;
      return await this.databaseService.unit.updateMany({
        where: { tacticalId: { in: channels } },
        data: {
          operation: $Enums.Operation.Free,
          tacticalId: null,
          incidentId: null,
        },
      });
    } else {
      const units = arg;
      return await this.databaseService.unit.updateMany({
        where: { id: { in: units } },
        data: {
          operation: $Enums.Operation.Free,
          tacticalId: null,
          incidentId: null,
        },
      });
    }
  }

  async get(id?: number) {
    if (id) {
      const channel = await this.databaseService.tactical.findFirst({
        where: { id },
      });

      if (channel === null) {
        return null;
      }

      const units = await this.databaseService.unit.findMany({
        where: { tacticalId: id },
        select: { id: true },
      });

      return {
        ...channel,
        units: units.map((val) => {
          return val.id;
        }),
      };
    }

    const raw = await this.databaseService.tactical.findMany({});
    const channels = await Promise.all(
      raw.map(async (val) => {
        const units = await this.databaseService.unit.findMany({
          where: { tacticalId: val.id },
          select: { id: true },
        });

        return {
          ...val,
          units: units.map((val) => {
            return val.id;
          }),
        };
      })
    );

    return channels;
  }
}
