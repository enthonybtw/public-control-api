import {
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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
} from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import {
  UnitCreateBodyDto,
  UnitDeleteBodyDto,
  UnitPatchBodyDto,
} from "./dto/unit.params.dto";
import {
  CountResponseDto,
  UnitBodyExtendedResponseDto,
  UnitBodyResponseDto,
} from "./dto/unit.response.dto";
import { UnitService } from "./unit.service";
import { IsInt } from "class-validator";

type check = Number | undefined;

@Controller("unit")
@UseGuards(AuthGuard)
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Post("create")
  @ApiCreatedResponse({ type: UnitBodyResponseDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: UnitCreateBodyDto
  ): Promise<UnitBodyExtendedResponseDto> {
    return await this.unitService.create(
      body.mark,
      body.operation,
      body.comment
    );
  }

  @Delete("delete")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async delete(@Body() body: UnitDeleteBodyDto): Promise<CountResponseDto> {
    return await this.unitService.delete(body.ids);
  }

  @Patch("patch")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async patch(
    @Body() body: UnitPatchBodyDto
  ): Promise<UnitBodyExtendedResponseDto[]> {
    return await this.unitService.patch(
      body.ids,
      body.mark,
      body.operation,
      body.comment,
      body.channelId,
      body.incidentId
    );
  }

  @Get("get/:id?")
  @ApiParam({
    name: "id",
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  async get(
    @Param("id") id?: number
  ): Promise<UnitBodyExtendedResponseDto | UnitBodyExtendedResponseDto[]> {
    const param = !(id === undefined || Number.isNaN(Number(id)))
      ? Number(id)
      : undefined;

    return await this.unitService.get(param);
  }
}
