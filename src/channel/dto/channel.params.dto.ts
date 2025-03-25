import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class ChannelClearBodyDto {
  @ApiProperty({ isArray: true, type: "number" })
  @IsArray()
  @IsInt({ each: true })
  ids: number[];
}

export class ChannelEditBodyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brief?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum($Enums.TacticalStatus)
  status?: $Enums.TacticalStatus;

  @ApiPropertyOptional({ type: "number" })
  @IsOptional()
  @IsInt()
  commander?: number;

  @ApiPropertyOptional({ isArray: true, type: "number" })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  units?: number[];
}

export class ChannelConnectBodyDto {
  @ApiProperty({ isArray: true, type: "number" })
  @IsArray()
  @IsInt({ each: true })
  units: number[];
}

export class ChannelDisconnectBodyDto {
  @ApiProperty({ isArray: true, type: "number" })
  @IsArray()
  @IsInt({ each: true })
  arg: number[];
}
