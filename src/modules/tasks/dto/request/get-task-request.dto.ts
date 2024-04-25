import { PickType } from '@nestjs/swagger';
import { TaskResponseDto } from '../response/task-reponse.dto';

export class GetTaskRequestDto extends PickType(TaskResponseDto, ['id']) {}
