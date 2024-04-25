import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './tasks.controller';
import { TaskService } from './services/tasks.service';
import { TaskStatus } from './services/types/enums';

describe('TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
  });

  describe('Tasks', () => {
    it('should create new Task', async () => {
      const newTask = await taskController.createNewTask({
        title: 'Some title',
        description: 'Some description',
        status: TaskStatus.Completed,
      });

      expect(newTask).toStrictEqual({
        id: expect.any(String),
        title: 'Some title',
        description: 'Some description',
        status: TaskStatus.Completed,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
