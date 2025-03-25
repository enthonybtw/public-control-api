import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateIncidentBodyDto {
  @ApiProperty()
  @IsString()
  brief: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsEnum($Enums.Priority)
  priority: $Enums.Priority;

  @ApiPropertyOptional()
  @IsInt()
  commander: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  units?: number[];
}

export class PatchIncidentBodyDto {
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
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum($Enums.Priority)
  priority?: $Enums.Priority;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  commander?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  units?: number[];
}

export class DeleteIncidentBodyDto {
  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  ids: number[];
}

export class ConnectUnitsToIncidentBodyDto {
  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  units: number[];
}

export class DisconnectUnitsFromIncidentBodyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  units?: number[];
}
