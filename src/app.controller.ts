import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { ApiVersionResponseDto } from "./app.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: ApiVersionResponseDto })
  async getApiVersion(): Promise<ApiVersionResponseDto> {
    return this.appService.getApiVersion();
  }
}
