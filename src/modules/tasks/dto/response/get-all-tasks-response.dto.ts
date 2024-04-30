import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { TaskResponseDto } from './task-reponse.dto';

export class GetAllTaskResponseDto {
  @IsNumber()
  @ApiProperty({
    description: 'Total number of tasks available in the database.',
    example: '10',
  })
  count: number;

  @ValidateNested()
  @Type(() => TaskResponseDto)
  @ApiProperty({
    description: 'An array containing tasks.',
    isArray: true,
    example: [
      {
        id: '39448ffa-d83d-4b9d-acdc-87d573428e89',
        title: 'Some title',
        description: 'Some description',
        status: 'completed',
        createdAt: '2024-04-29T21:02:49.000Z',
        updatedAt: '2024-04-29T21:02:49.000Z',
      },
      {
        id: '39448ffa-d83d-4b9d-acdc-87d573428e89',
        title: 'Some another title',
        description: 'Some another description',
        status: 'backlog',
        createdAt: '2024-04-29T21:02:49.000Z',
        updatedAt: '2024-04-30T21:02:49.000Z',
      },
    ],
  })
  data: TaskResponseDto[];
}
