import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export class ChannelBodyResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: "string" })
  brief: string | null;

  @ApiProperty({ type: "string" })
  description: string | null;

  @ApiProperty({
    enum: $Enums.TacticalStatus,
    example: [
      $Enums.TacticalStatus.Formation,
      $Enums.TacticalStatus.Process,
      $Enums.TacticalStatus.Ending,
    ],
  })
  status: $Enums.TacticalStatus | null;

  @ApiProperty({ type: "number" })
  commander: number | null;

  @ApiProperty({ isArray: true, type: "number" })
  units: number[] | null;
}
