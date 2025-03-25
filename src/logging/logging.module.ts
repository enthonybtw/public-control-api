import { Global, Module } from "@nestjs/common";
import { LoggingService } from "./logging.service";
import { DatabaseModule } from "src/database/database.module";
import { AccountModule } from "src/account/account.module";

@Global()
@Module({
  providers: [LoggingService],
  imports: [DatabaseModule, AccountModule],
  exports: [LoggingService],
})
export class LoggingModule {}
