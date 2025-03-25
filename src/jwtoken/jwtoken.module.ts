import { Global, Module } from "@nestjs/common";
import { JwtokenService } from "./jwtoken.service";
import { DatabaseModule } from "src/database/database.module";

@Global()
@Module({
  providers: [JwtokenService],
  exports: [JwtokenService],
  imports: [DatabaseModule],
})
export class JwtokenModule {}
