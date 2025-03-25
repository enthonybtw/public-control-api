import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { LoggingService } from "./logging.service";
import {
  LoggingDateType,
  LoggingExecTimeType,
  LoggingIpAddressType,
  LoggingUserAgentType,
} from "./types/logging.types";
import {
  LoggingReceivedData,
  LoggingRequestedData,
  LoggingUserDataType,
} from "./types/logging.interface";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const reqData: LoggingRequestedData = {
      method: req.method,
      route: req.originalUrl,
      payload: req.body,
      length: req.get("content-length"),
    };

    const beginDate: LoggingDateType = new Date().getMilliseconds();
    const userAgent: LoggingUserAgentType = req.get("user-agent");
    const clientIp: LoggingIpAddressType = req.ip;

    res.on("close", () => {
      const resData: LoggingReceivedData = {
        statusCode: res.statusCode,
        length: res.get("content-length"),
      };

      const userData: LoggingUserDataType = res.req["session"]
        ? {
            id: res.req["session"]["id"],
            token: res.req["session"]["token"],
          }
        : null;

      const endDate: LoggingDateType = new Date().getMilliseconds();
      const execTime: LoggingExecTimeType = endDate - beginDate + " ms";
    });

    next();
  }
}
