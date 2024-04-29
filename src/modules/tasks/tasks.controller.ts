import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TaskService } from './services/tasks.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/request/create-task-request.dto';
import { TaskResponseDto } from './dto/response/task-reponse.dto';
import { GetTaskRequestDto } from './dto/request/get-task-request.dto';
import { UpdateTaskDto } from './dto/request/update.task.dto';
import { GetAllTaskResponseDto } from './dto/response/get-all-tasks-response.dto';
import { GetAllTaskRequestDto } from './dto/request/get-all-tasks-request.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({
    operationId: 'createTask',
    description: 'Create new Task.',
    summary: 'Create Task',
  })
  @ApiCreatedResponse({
    description: 'Created task',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async createNewTask(
    @Body() createTask: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.taskService.create(createTask);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getTask',
    description: 'Get task by id.',
    summary: 'Get task by id',
  })
  @ApiOkResponse({
    description: 'Retrieved task.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async getTaskById(
    @Param() params: GetTaskRequestDto,
  ): Promise<TaskResponseDto> {
    const { id } = params;
    return await this.taskService.getById(id);
  }

  @Get('/')
  @ApiOperation({
    operationId: 'getAllTasks',
    description: 'Get all tasks using pagination.',
    summary: 'Get all tasks using pagination',
  })
  @ApiOkResponse({
    description: 'Retrieved list of all tasks.',
    type: GetAllTaskResponseDto,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async getAllTasks(
    @Query() getAllTaskRequest: GetAllTaskRequestDto,
  ): Promise<GetAllTaskResponseDto> {
    return await this.taskService.getAll(getAllTaskRequest);
  }

  @Patch(':id')
  @ApiOperation({
    operationId: 'updateTaskStatus',
    description: 'Update a state of a task.',
    summary: 'Update a state of a task',
  })
  @ApiOkResponse({
    description: 'Retrieved task.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async updateTaskStatus(
    @Param() params: GetTaskRequestDto,
    @Body() updateTask: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const { id } = params;
    const { status: newStatus } = updateTask;
    return await this.taskService.update(id, newStatus);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteTask',
    description: 'Delete task.',
    summary: 'Delete task',
  })
  @ApiNoContentResponse({
    description: 'Successful operation',
  })
  @HttpCode(204)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async deleteTaskById(@Param() params: GetTaskRequestDto): Promise<void> {
    const { id } = params;
    await this.taskService.deleteById(id);
  }
}
