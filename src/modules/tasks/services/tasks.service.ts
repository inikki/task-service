import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/request/create-task-request.dto';
import { GetAllTaskRequestDto } from '../dto/request/get-all-tasks-request.dto';
import { GetAllTaskResponseDto } from '../dto/response/get-all-tasks-response.dto';
import { TaskResponseDto } from '../dto/response/task-reponse.dto';
import { TaskStatus } from './types/enums';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTask: CreateTaskDto): Promise<TaskResponseDto> {
    // Save the new task to db
    return await this.taskRepository.save(createTask);
  }

  async getById(id: string): Promise<TaskResponseDto> {
    try {
      const foundTask = await this.taskRepository.findOneBy({ id });

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
    const take = getAllTaskRequest.limit || 100;
    const skip = getAllTaskRequest.offset || 0;

    const [result, total] = await this.taskRepository.findAndCount({
      take,
      skip,
    });
    return {
      data: result,
      count: total,
    };
  }

  async update(id: string, newStatus: TaskStatus): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException();
    }
    await this.taskRepository.update(id, {
      status: newStatus,
    });
    const updatedTask = await this.taskRepository.findOneBy({ id });
    return updatedTask;
  }

  async deleteById(id: string): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException();
    }
    await this.taskRepository.delete(id);
  }
}
