import { Module } from "@nestjs/common";
import { MarkService } from "./mark.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
  providers: [MarkService],
  exports: [MarkService],
  imports: [DatabaseModule],
})
export class MarkModule {}
