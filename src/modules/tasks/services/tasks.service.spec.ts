import { Test } from '@nestjs/testing';

import type { TestingModule } from '@nestjs/testing';
import { TaskService } from './tasks.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
