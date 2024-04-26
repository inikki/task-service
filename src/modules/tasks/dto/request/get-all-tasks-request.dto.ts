import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllTaskRequestDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '',
    example: '',
  })
  limit?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '',
    example: '',
  })
  offset?: number;
}
