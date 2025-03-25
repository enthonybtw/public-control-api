import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { DatabaseModule } from "src/database/database.module";
import { AccountModule } from "src/account/account.module";

@Module({
  providers: [UserService],
  imports: [DatabaseModule, AccountModule],
  exports: [UserService],
})
export class UserModule {}
