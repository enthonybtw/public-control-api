import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export class UnitBodyResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  mark: string;

  @ApiProperty()
  department: number;

  @ApiProperty({
    enum: [
      [
        $Enums.Operation.Free,
        $Enums.Operation.Break,
        $Enums.Operation.Busy,
        $Enums.Operation.Escorting,
        $Enums.Operation.Scene,
        $Enums.Operation.Unknown,
      ],
    ],
  })
  operation: $Enums.Operation;

  @ApiPropertyOptional()
  comment: string | null;
}

export class UnitBodyExtendedResponseDto extends UnitBodyResponseDto {
  @ApiPropertyOptional()
  incidentId: number | null;

  @ApiPropertyOptional()
  tacticalId: number | null;
}

export class CountResponseDto {
  @ApiProperty()
  count?: number;
}
