import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../../services/types/enums';

export class TaskDto {
  @IsString()
  @ApiProperty({
    description: 'ID of the task.',
    example: 'Lorem ipsum',
  })
  title!: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'Task description.',
    example: 'Lorem ipsum.',
  })
  description!: string;

  @IsEnum(TaskStatus)
  @ApiPropertyOptional({
    description: 'Task status.',
    example: TaskStatus.InProgress,
    enum: TaskStatus,
  })
  status!: TaskStatus;
}
