import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '../entities/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/request/create-task-request.dto';
import { SortBy, SortOrder, TaskStatus } from './types/enums';
import { NotFoundException } from '@nestjs/common';
import { TaskService } from './tasks.service';

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn(),
            findOneBy: jest.fn(),
            findAndCount: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should create a new task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Some test task',
      description: 'Some test description',
      status: TaskStatus.Backlog,
    };

    const expectedTask: Task = {
      id: '1',
      ...createTaskDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(repository, 'save').mockResolvedValue(expectedTask);

    const result = await service.create(createTaskDto, 'some-user-id');

    expect(repository.save).toHaveBeenCalledWith(createTaskDto);
    expect(result).toEqual(expectedTask);
  });

  it('should get a task by id', async () => {
    const taskId = '1';
    const expectedTask: Task = {
      id: taskId,
      title: 'Some test task',
      description: 'Some test description',
      status: TaskStatus.Backlog,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedTask);

    const result = await service.getById(taskId);

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: taskId });
    expect(result).toEqual(expectedTask);
  });

  it('should throw NotFoundException when task not found by id', async () => {
    const taskId = '1';

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

    await expect(service.getById(taskId)).rejects.toThrow(NotFoundException);

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: taskId });
  });

  it('should get all tasks with pagination', async () => {
    const getAllTaskRequestDto = {
      limit: 10,
      offset: 0,
      sortBy: SortBy.CreatedAt,
      sortOrder: SortOrder.ASC,
    };

    const expectedTasks: Task[] = [
      {
        id: '1',
        title: 'Some test task',
        description: 'Some test description',
        status: TaskStatus.Backlog,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Some test task 2',
        description: 'Some test description 2',
        status: TaskStatus.Backlog,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest
      .spyOn(repository, 'findAndCount')
      .mockResolvedValue([expectedTasks, expectedTasks.length]);

    const result = await service.getAll(getAllTaskRequestDto);

    expect(repository.findAndCount).toHaveBeenCalledWith({
      take: getAllTaskRequestDto.limit,
      skip: getAllTaskRequestDto.offset,
      order: {
        [getAllTaskRequestDto.sortBy]: getAllTaskRequestDto.sortOrder,
      },
    });
    expect(result.data).toEqual(expectedTasks);
    expect(result.count).toEqual(expectedTasks.length);
  });

  it('should update task status', async () => {
    const taskId = '1';
    const newStatus = TaskStatus.Completed;

    const existingTask: Task = {
      id: taskId,
      title: 'Some test task',
      description: 'Some test description',
      status: TaskStatus.Backlog,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedTask: Task = {
      ...existingTask,
      status: newStatus,
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(existingTask);
    jest
      .spyOn(repository, 'update')
      .mockResolvedValue({ affected: 1 } as UpdateResult);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(updatedTask);

    const result = await service.update(taskId, newStatus);

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: taskId });
    expect(repository.update).toHaveBeenCalledWith(taskId, {
      status: newStatus,
    });
    expect(result).toEqual(updatedTask);
  });

  it('should delete task by id', async () => {
    const taskId = '1';
    const existingTask: Task = {
      id: taskId,
      title: 'Some test task',
      description: 'Some test description',
      status: TaskStatus.Backlog,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(existingTask);
    jest
      .spyOn(repository, 'delete')
      .mockResolvedValue({ affected: 1 } as DeleteResult);

    await service.deleteById(taskId);

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: taskId });
    expect(repository.delete).toHaveBeenCalledWith(taskId);
  });
});
