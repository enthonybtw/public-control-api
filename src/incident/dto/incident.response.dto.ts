import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export class IncidentBodyResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  brief: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  priority: $Enums.Priority;

  @ApiPropertyOptional()
  commander?: number | null;

  @ApiPropertyOptional()
  units?: number[] | null;
}

export class CountBodyResponseDto {
  @ApiProperty()
  count: number;
}

export class ConnectedUnitsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  units: number[];
}

export class DisconnectedUnitsResponseDto {
  @ApiProperty()
  disconnected: number[];
}
