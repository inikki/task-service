import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './services/tasks.service';
import { TaskController } from './tasks.controller';

describe('TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const task = {
      id: '09065bd5-c50d-4f64-b98c-99f7a717c748',
      title: 'Some title',
      description: 'Some description',
      status: 'completed',
      createdAt: '2024-04-26T11:07:46.000Z',
      updatedAt: '2024-04-26T11:30:07.000Z',
    };

    const updatedTask = {
      id: '09065bd5-c50d-4f64-b98c-99f7a717c748',
      title: 'Some title',
      description: 'Some description',
      status: 'backlog',
      createdAt: '2024-04-26T11:07:46.000Z',
      updatedAt: '2024-04-26T11:30:07.000Z',
    };

    const TaskServiceProvider = {
      provide: TaskService,
      useFactory: () => ({
        getAll: jest.fn(async () => ({
          data: [
            {
              id: '09065bd5-c50d-4f64-b98c-99f7a717c748',
              title: 'Some title',
              description: 'Some description',
              status: 'backlog',
              createdAt: '2024-04-26T11:07:46.000Z',
              updatedAt: '2024-04-26T11:30:07.000Z',
            },
            {
              id: '0987c8f9-3b04-48ef-80d9-a93a6512539a',
              title: 'Some title',
              description: 'Some description',
              status: 'completed',
              createdAt: '2024-04-26T11:05:56.000Z',
              updatedAt: '2024-04-26T11:05:56.000Z',
            },
          ],
          count: 22,
        })),
        getById: jest.fn(async () => task),
        create: jest.fn(async () => task),
        update: jest.fn(async () => updatedTask),
        deleteById: jest.fn(async () => task),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskServiceProvider],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });
});
