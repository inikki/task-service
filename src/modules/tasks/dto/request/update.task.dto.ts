import { PickType } from '@nestjs/swagger';
import { TaskResponseDto } from '../response/task-reponse.dto';

export class UpdateTaskDto extends PickType(TaskResponseDto, ['status']) {}
