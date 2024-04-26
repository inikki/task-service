import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../src/modules/tasks/entities/task.entity';
import { TaskStatus } from '../src/modules/tasks/services/types/enums';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite', // in-memory SQLite for testing
          database: ':memory:',
          entities: [Task],
          synchronize: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([Task]),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create new task', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        title: 'Some title',
        description: 'Some description',
        status: 'backlog',
      });

    expect(status).toBe(201);
    expect(body).toEqual({
      id: expect.any(String),
      title: 'Some title',
      description: 'Some description',
      status: TaskStatus.Backlog,
      createdAt: expect.stringMatching(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/,
      ),
      updatedAt: expect.stringMatching(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/,
      ),
    });
  });

  it('should get task by id', async () => {
    const newTask = await request(app.getHttpServer()).post('/tasks').send({
      title: 'Some another title',
      description: 'Some another description',
      status: 'backlog',
    });

    const { body } = newTask;
    const { id } = body;
    const response = await request(app.getHttpServer())
      .get(`/tasks/${id}`)
      .expect(200);

    expect(response.body).toEqual({
      id: expect.any(String),
      title: 'Some another title',
      description: 'Some another description',
      status: TaskStatus.Backlog,
      createdAt: expect.stringMatching(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/,
      ),
      updatedAt: expect.stringMatching(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/,
      ),
    });
  });

  it('should update task by id', async () => {
    const newTask = await request(app.getHttpServer()).post('/tasks').send({
      title: 'Some another title',
      description: 'Some another description',
      status: 'backlog',
    });

    const { body } = newTask;
    const { id } = body;
    const response = await request(app.getHttpServer())
      .patch(`/tasks/${id}`)
      .send({ status: 'in progress' })
      .expect(200);

    expect(response.body).toEqual({
      id: expect.any(String),
      title: 'Some another title',
      description: 'Some another description',
      status: TaskStatus.InProgress,
      createdAt: expect.stringMatching(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/,
      ),
      updatedAt: expect.stringMatching(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/,
      ),
    });
  });

  it('should get all', async () => {
    for (let i = 0; i < 20; i++) {
      await request(app.getHttpServer())
        .post('/tasks')
        .send({
          title: 'Some title',
          description: 'someDescription',
          status: 'backlog',
        })
        .expect(201);
    }

    const response = await request(app.getHttpServer())
      .get(`/tasks/`)
      .expect(200);

    expect(response.body.count).toEqual(20);
    expect(response.body.data.length).toEqual(20);
  });

  it('should get all with pagination', async () => {
    for (let i = 0; i < 20; i++) {
      await request(app.getHttpServer())
        .post('/tasks')
        .send({
          title: 'Some title',
          description: 'someDescription',
          status: 'backlog',
        })
        .expect(201);
    }

    const response = await request(app.getHttpServer())
      .get(`/tasks?offset=0&limit=10`)
      .expect(200);

    expect(response.body.count).toEqual(20);
    expect(response.body.data.length).toEqual(10);
  });

  it('should delete task by id', async () => {
    const newTask = await request(app.getHttpServer()).post('/tasks').send({
      title: 'Some title',
      description: 'someDescription',
      status: 'backlog',
    });

    const { body } = newTask;
    const { id } = body;
    await request(app.getHttpServer()).delete(`/tasks/${id}`).expect(204);

    await request(app.getHttpServer()).get(`/tasks/${id}`).expect(404);
  });

  it('should delete task by id', async () => {
    const newTask = await request(app.getHttpServer()).post('/tasks').send({
      title: 'Some title',
      description: 'someDescription',
      status: 'backlog',
    });

    const { body } = newTask;
    const { id } = body;
    await request(app.getHttpServer()).delete(`/tasks/${id}`).expect(204);

    await request(app.getHttpServer()).get(`/tasks/${id}`).expect(404);
  });

  it('should throw validation exception', async () => {
    const response = await request(app.getHttpServer()).post('/tasks').send({
      title: 'Some title',
      status: 'WrongStatus',
    });

    expect(response.body).toEqual({
      error: 'Bad Request',
      message: [
        'description must be a string',
        'status must be one of the following values: completed, in progress, backlog',
      ],
      statusCode: 400,
    });
  });

  it('should throw notFound exception', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks/NonExistingTaskId')
      .expect(404);

    expect(response.body).toEqual({
      errorCodes: ['TASK_NOT_FOUND'],
      message: 'Task not found',
    });
  });
});
