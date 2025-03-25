import { Module } from "@nestjs/common";
import { IncidentService } from "./incident.service";
import { IncidentController } from "./incident.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  providers: [IncidentService],
  controllers: [IncidentController],
  imports: [DatabaseModule],
})
export class IncidentModule {}
