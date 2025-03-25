import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ChannelClearBodyDto,
  ChannelConnectBodyDto,
  ChannelDisconnectBodyDto,
  ChannelEditBodyDto,
} from "./dto/channel.params.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ChannelService } from "./channel.service";
import { ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { ChannelBodyResponse } from "./dto/channel.response.dto";

@Controller("channel")
@UseGuards(AuthGuard)
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Patch("clear")
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async clear(@Body() body: ChannelClearBodyDto) {
    return this.channelService.clear(body.ids);
  }

  @Patch("edit/:id")
  @ApiOkResponse({ type: ChannelBodyResponse })
  @ApiParam({ name: "id", required: true })
  @HttpCode(HttpStatus.OK)
  async edit(
    @Param("id") id: number,
    @Body() body: ChannelEditBodyDto
  ): Promise<ChannelBodyResponse> {
    if (Number.isNaN(Number(id))) {
      throw new BadRequestException("Параметр должен быть числом");
    }

    return this.channelService.edit(
      Number(id),
      body.brief,
      body.description,
      body.status,
      body.commander,
      body.units
    );
  }

  @Put("connect/:id")
  @ApiOkResponse()
  @ApiParam({ name: "id", required: true })
  @HttpCode(HttpStatus.OK)
  async connect(@Param("id") id: Number, @Body() body: ChannelConnectBodyDto) {
    const channel = Number(id);
    if (Number.isNaN(channel)) {
      throw new BadRequestException("Нельзя использовать строки");
    }

    return await this.channelService.connect(channel, body.units);
  }

  @Put("disconnect/:mode?")
  @ApiOkResponse()
  @ApiParam({ name: "mode", required: false })
  @HttpCode(HttpStatus.OK)
  async disconnect(
    @Param("mode") mode: String,
    @Body() body: ChannelDisconnectBodyDto
  ) {
    return await this.channelService.disconnect(
      body.arg,
      mode === "bychannel" ? true : false
    );
  }

  @Get("get/:id?")
  @ApiOkResponse()
  @ApiParam({ name: "id", required: false })
  @HttpCode(HttpStatus.OK)
  async get(@Param("id") id: Number) {
    const channel = Number(id);
    return await this.channelService.get(
      !Number.isNaN(channel) ? channel : undefined
    );
  }
}
