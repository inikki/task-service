import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/request/create-task-request.dto';
import { TaskResponseDto } from '../dto/response/task-reponse.dto';
import { randomUUID } from 'crypto';
import { Task } from './types/interface';
import { TaskStatus } from './types/enums';
import { GetAllTaskResponseDto } from '../dto/response/get-all-tasks-response.dto';
import { GetAllTaskRequestDto } from '../dto/request/get-all-tasks-request.dto';

@Injectable()
export class TaskService {
  private tasks: Record<string, Task> = {};

  async create(createTask: CreateTaskDto): Promise<TaskResponseDto> {
    const { title, description, status } = createTask;
    const id = randomUUID();

    const newTask: Task = {
      id,
      title,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save the new task in memory
    this.tasks[id] = newTask;

    return newTask;
  }

  async getById(id: string): Promise<TaskResponseDto> {
    try {
      const foundTask = this.tasks[id];
      if (!foundTask) {
        throw new NotFoundException();
      }
      return foundTask;
    } catch (error) {
      throw new NotFoundException({
        message: 'Task not found',
        errorCodes: ['TASK_NOT_FOUND'],
      });
    }
  }

  async getAll(
    getAllTaskRequest: GetAllTaskRequestDto,
  ): Promise<GetAllTaskResponseDto> {
    return 'All tasks retrieved!';
  }

  async updateTaskStatus(
    id: string,
    newStatus: TaskStatus,
  ): Promise<TaskResponseDto> {
    const task = this.tasks[id];
    if (!task) {
      throw new NotFoundException();
    }
    task.status = newStatus;
    task.updatedAt = new Date();
    return task;
  }

  async deleteById(id: string): Promise<void> {
    const task = this.tasks[id];
    if (!task) {
      throw new NotFoundException();
    }
    delete this.tasks[id];
  }
}
