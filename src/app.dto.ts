import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApiVersionResponseDto {
  @ApiProperty()
  version: string;

  @ApiPropertyOptional()
  codename?: string;

  @ApiPropertyOptional()
  patch?: number;
}
