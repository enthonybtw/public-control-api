import { Injectable } from "@nestjs/common";
import { ApiVersionResponseDto } from "./app.dto";

@Injectable()
export class AppService {
  getApiVersion(): ApiVersionResponseDto {
    const version = "1.0.0";
    const codename = "Undefined Api Codename";
    const patch = 2400;

    return {
      version: version,
      codename: codename,
      patch: Number(patch),
    };
  }
}
