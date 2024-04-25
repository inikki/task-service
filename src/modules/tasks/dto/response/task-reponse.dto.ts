import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { TaskDto } from '../common/task.dto';
import { Type } from 'class-transformer';

export class TaskResponseDto extends TaskDto {
  @IsString()
  @ApiProperty({
    description: 'ID of the task.',
    example: 'd78e4fd9-3a7d-4e33-a101-24e3c1df713d',
  })
  id!: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Task creation timestamp.',
    format: 'date',
    example: '2021-12-16T13:47:06.051Z',
  })
  createdAt!: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Task update timestamp.',
    format: 'date',
    example: '2021-12-16T13:47:06.051Z',
  })
  updatedAt!: Date;
}
