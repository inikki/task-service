import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../../services/types/enums';
import { Expose } from 'class-transformer';

export class TaskDto {
  @IsString()
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the task.',
    example: 'Lorem ipsum',
  })
  title!: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Task description.',
    example: 'Lorem ipsum.',
  })
  description!: string;

  @IsEnum(TaskStatus)
  @Expose()
  @ApiProperty({
    description: 'Task status.',
    example: TaskStatus.InProgress,
    enum: TaskStatus,
  })
  status!: TaskStatus;
}
