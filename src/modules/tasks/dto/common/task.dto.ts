import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../../services/types/enums';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the task.',
    example: 'Lorem ipsum',
  })
  title!: string;

  @IsString()
  @IsNotEmpty()
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
