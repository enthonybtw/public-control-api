import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class UnitCreateBodyDto {
  @ApiProperty({ example: "1L-10" })
  @IsString()
  mark: string;

  @ApiProperty({
    example: $Enums.Operation.Free,
  })
  @IsEnum($Enums.Operation)
  operation: $Enums.Operation;

  @ApiPropertyOptional({ example: "" })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class UnitDeleteBodyDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsInt({ each: true })
  ids: number[];
}

export class UnitPatchBodyDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsInt({ each: true })
  ids: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mark?: string;

  @ApiPropertyOptional({ example: $Enums.Operation.Free })
  @IsOptional()
  @IsEnum($Enums.Operation)
  operation?: $Enums.Operation;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  incidentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  channelId?: number;
}

export class UnitGetBodyDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  id?: number;
}
