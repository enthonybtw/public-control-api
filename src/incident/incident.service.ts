import { BadRequestException, Injectable } from "@nestjs/common";
import { $Enums } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { PatchIncidentBodyDto } from "./dto/incident.params.dto";

@Injectable()
export class IncidentService {
  constructor(private databaseService: DatabaseService) {}

  async create(
    brief: string,
    description: string,
    location: string,
    priority: $Enums.Priority,
    commander: number,
    units?: number[]
  ) {
    const { id } = await this.databaseService.incident.create({
      data: { brief, description, location, priority, commander },
    });

    if (units !== undefined && units.length > 0) {
      await this.connect(id, units);
    }

    const body = await this.get(id);
    const members = await this.members(id);

    return { ...body[0], units: members };
  }

  async delete(ids: number[]) {
    await this.disconnect(1, ids);

    return await this.databaseService.incident.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async patch(id: number, body: PatchIncidentBodyDto) {
    if ((await this.get(id)).length === 0) {
      throw new BadRequestException("Ситуации с таким ID не существует!");
    }

    const lastUnits = await this.members(id);
    const patchUnits = typeof body.units === "undefined" ? [] : body.units;

    const formatUnits = () => {
      const toConnect = patchUnits.filter((value) => {
        if (!lastUnits.includes(value)) {
          return value;
        }
      });

      const toDisconnect = lastUnits.filter((value) => {
        if (!patchUnits.includes(value)) {
          return value;
        }
      });

      return {
        update: true,
        connect: toConnect,
        disconnect: toDisconnect,
      };
    };

    const updatedBody = await this.databaseService.incident.update({
      where: { id },
      data: {
        brief: body.brief,
        description: body.description,
        location: body.location,
        priority: body.priority,
        commander: body.commander,
      },
    });

    const formatUnitsArray = formatUnits();

    if (formatUnitsArray.update === true) {
      if (formatUnitsArray.connect.length > 0) {
        await this.connect(id, formatUnitsArray.connect);
      }

      if (formatUnitsArray.disconnect.length > 0) {
        await this.disconnect(2, formatUnitsArray.disconnect);
      }
    }

    const connectedUnits = await this.members(id);

    return { ...updatedBody, units: connectedUnits };
  }

  async connect(id: number, units: number[]) {
    if (units.length === 0) {
      throw new BadRequestException("Массив юнитов не может быть пустым!");
    }

    await this.databaseService.unit.updateMany({
      where: { id: { in: units } },
      data: {
        incidentId: id,
        tacticalId: null,
        operation: $Enums.Operation.Scene,
      },
    });

    return { id, units: await this.members(id) };
  }

  async disconnect(mode: number, arg: number[]) {
    // Mode #1: disconnect units by ids of incidents
    // Mode #2: disconnect units by ids of units

    switch (mode) {
      case 1:
        const firstModeUnits =
          await this.databaseService.unit.updateManyAndReturn({
            where: { incidentId: { in: arg } },
            data: {
              incidentId: null,
              tacticalId: null,
              operation: $Enums.Operation.Free,
            },
          });

        const ids = firstModeUnits.map((value) => {
          return value.id;
        });

        return { disconnected: ids };

      case 2:
        const secondModeUnits =
          await this.databaseService.unit.updateManyAndReturn({
            where: { id: { in: arg } },
            data: {
              incidentId: null,
              tacticalId: null,
              operation: $Enums.Operation.Free,
            },
          });

        const secondModeIds = secondModeUnits.map((value) => {
          return value.id;
        });

        return { disconnected: secondModeIds };

      default:
        throw new BadRequestException(
          "Выбран неверный режим для отключения юнитов"
        );
    }
  }

  async members(id: number) {
    const units = await this.databaseService.unit.findMany({
      where: { incidentId: id },
    });

    return units.map((value) => {
      return value.id;
    });
  }

  async get(id?: number) {
    return await this.databaseService.incident.findMany({ where: { id } });
  }
}
