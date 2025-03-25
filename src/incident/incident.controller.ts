import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ConnectUnitsToIncidentBodyDto,
  CreateIncidentBodyDto,
  DeleteIncidentBodyDto,
  DisconnectUnitsFromIncidentBodyDto,
  PatchIncidentBodyDto,
} from "./dto/incident.params.dto";
import {
  ConnectedUnitsResponseDto,
  CountBodyResponseDto,
  DisconnectedUnitsResponseDto,
  IncidentBodyResponseDto,
} from "./dto/incident.response.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { IncidentService } from "./incident.service";
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";

@UseGuards(AuthGuard)
@Controller("incident")
export class IncidentController {
  constructor(private incidentService: IncidentService) {}

  @Post("create")
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateIncidentBodyDto
  ): Promise<IncidentBodyResponseDto> {
    return await this.incidentService.create(
      body.brief,
      body.description,
      body.location,
      body.priority,
      body.commander,
      body.units
    );
  }

  @Delete("delete")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body() body: DeleteIncidentBodyDto
  ): Promise<CountBodyResponseDto> {
    return await this.incidentService.delete(body.ids);
  }

  @Patch("patch/:id")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async patch(@Param("id") id: number, @Body() body: PatchIncidentBodyDto) {
    if (Number.isNaN(Number(id))) {
      throw new BadRequestException("Параметр incident/patch должен быть INT");
    }

    return await this.incidentService.patch(Number(id), body);
  }

  @Patch("connect/:id")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async connect(
    @Param("id") id: number,
    @Body() body: ConnectUnitsToIncidentBodyDto
  ): Promise<ConnectedUnitsResponseDto> {
    if (Number.isNaN(Number(id))) {
      throw new BadRequestException("Параметр connect должен быть INT");
    }

    return this.incidentService.connect(Number(id), body.units);
  }

  @Patch("disconnect/:id?")
  @ApiOkResponse()
  @ApiParam({
    name: "id",
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  async disconnect(
    @Param("id") id: number,
    @Body() body: DisconnectUnitsFromIncidentBodyDto
  ): Promise<DisconnectedUnitsResponseDto> {
    if (!Number.isNaN(Number(id))) {
      return await this.incidentService.disconnect(1, [Number(id)]);
    }

    if (typeof body.units !== "undefined") {
      return await this.incidentService.disconnect(2, body.units);
    }
    return { disconnected: [] };
  }

  @Get("get/:id?")
  @ApiOkResponse()
  @ApiParam({
    name: "id",
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  async get(@Param("id") id: number): Promise<IncidentBodyResponseDto[]> {
    const body = await this.incidentService.get(
      !Number.isNaN(Number(id)) ? Number(id) : undefined
    );

    const parsed = await Promise.all(
      body.map(async (value) => {
        const members = await this.incidentService.members(value.id);
        return { ...value, units: members };
      })
    );

    return parsed;
  }
}
