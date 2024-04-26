import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './tasks.controller';
import { TaskService } from './services/tasks.service';
import { TaskStatus } from './services/types/enums';
import { NotFoundException } from '@nestjs/common';

describe('TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
  });

  describe('Success case', () => {
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

    it('should get task by id', async () => {
      const newTask = await taskController.createNewTask({
        title: 'Some title',
        description: 'Some description',
        status: TaskStatus.Completed,
      });

      const { id } = newTask;
      const task = await taskController.getTaskById({ id });

      expect(id).toEqual(task.id);
      expect(newTask).toStrictEqual({
        id,
        title: 'Some title',
        description: 'Some description',
        status: TaskStatus.Completed,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should get all tasks by pagination', async () => {
      // TODO
    });

    it('should update task by id', async () => {
      const newTask = await taskController.createNewTask({
        title: 'Some title',
        description: 'Some description',
        status: TaskStatus.Completed,
      });

      const { id } = newTask;
      const task = await taskController.updateTaskStatus(
        { id },
        { status: TaskStatus.Backlog },
      );

      expect(id).toEqual(task.id);
      expect(newTask).toStrictEqual({
        id,
        title: 'Some title',
        description: 'Some description',
        status: TaskStatus.Backlog,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should delete task by id', async () => {
      const newTask = await taskController.createNewTask({
        title: 'Some title',
        description: 'Some description',
        status: TaskStatus.Completed,
      });

      const { id } = newTask;
      await taskController.deleteTaskById({ id });

      await expect(taskController.getTaskById({ id })).rejects.toThrow(
        new NotFoundException('Task not found'),
      );
    });
  });

  describe('Error case', () => {
    it('should throw validation exception', async () => {});

    it('should throw notFound exception', async () => {});
  });
});
