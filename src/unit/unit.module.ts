import { Module } from "@nestjs/common";
import { UnitService } from "./unit.service";
import { UnitController } from "./unit.controller";
import { DatabaseModule } from "src/database/database.module";
import { MarkModule } from "src/mark/mark.module";

@Module({
  providers: [UnitService],
  controllers: [UnitController],
  imports: [DatabaseModule, MarkModule],
})
export class UnitModule {}
