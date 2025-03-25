import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsEnum, isEnum, IsNotEmpty, IsOptional } from "class-validator";

export class AccountDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  position: $Enums.Roles;
}

export class PatchAccountBodyDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @ApiPropertyOptional()
  @IsEnum([$Enums.Roles])
  @IsNotEmpty()
  @IsOptional()
  position: $Enums.Roles;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  online: number;
}
