import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './services/tasks.service';
import { TaskController } from './tasks.controller';
import { CreateTaskDto } from './dto/request/create-task-request.dto';
import { TaskStatus } from './services/types/enums';
import { TaskResponseDto } from './dto/response/task-reponse.dto';

describe('TaskController', () => {
  let taskController: TaskController;

  let spyCreate: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn(),
            getById: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    const mockedService = module.get<TaskService>(TaskService);
    spyCreate = jest.spyOn(mockedService, 'create');

    taskController = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should create a new task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Some new task',
      description: 'Some description',
      status: TaskStatus.Backlog,
    };
    const expectedTaskResponse: TaskResponseDto = {
      id: 'some-uuid',
      ...createTaskDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    spyCreate.mockResolvedValue(expectedTaskResponse);

    const result = await taskController.createNewTask(
      'some-user-id',
      createTaskDto,
    );

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(spyCreate).toHaveBeenCalledWith(createTaskDto);
    expect(result).toEqual(expectedTaskResponse);
  });
});
