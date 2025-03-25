import { Module } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  providers: [ChannelService],
  controllers: [ChannelController],
  imports: [DatabaseModule],
})
export class ChannelModule {}
