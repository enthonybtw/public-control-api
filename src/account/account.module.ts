import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [DatabaseModule],
  exports: [AccountService],
})
export class AccountModule {}
