import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class SignInBodyDto {
  @ApiProperty({ example: "00000" })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: "changepassword" })
  @IsNotEmpty()
  password: string;
}

export class SignUpBodyDto {
  @ApiProperty({ example: "00000" })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: "changepassword" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "Ethan Murphy" })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: $Enums.Roles.Developer })
  @IsNotEmpty()
  @IsEnum($Enums.Roles)
  position: $Enums.Roles;
}

export class GetSessionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  token: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}
