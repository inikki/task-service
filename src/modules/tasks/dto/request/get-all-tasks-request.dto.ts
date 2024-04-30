import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortBy, SortOrder } from '../../services/types/enums';
import { Transform } from 'class-transformer';

export class GetAllTaskRequestDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description:
      'The maximum number of tasks to retrieve. Defaults to 100 if not specified.',
    example: 10,
  })
  limit?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description:
      'The offset from which to start retrieving tasks. Useful for pagination.',
    example: 20,
  })
  offset?: number;

  @IsOptional()
  @IsEnum(SortBy)
  @ApiProperty({
    description: 'The field by which to sort the tasks. Defaults to createdAt.',
    example: 'createdAt',
    enum: SortBy,
  })
  sortBy?: SortBy;

  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  @IsEnum(SortOrder)
  @ApiProperty({
    description: 'The order in which to sort the tasks. Defaults to desc.',
    example: 'asc',
    enum: SortOrder,
  })
  sortOrder?: SortOrder;
}
