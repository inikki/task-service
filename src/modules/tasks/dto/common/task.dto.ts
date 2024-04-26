import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Task description.',
    example: 'Lorem ipsum.',
  })
  description!: string;

  @IsEnum(TaskStatus)
  @ApiProperty({
    description: 'Task status.',
    example: TaskStatus.InProgress,
    enum: TaskStatus,
  })
  status!: TaskStatus;
}
