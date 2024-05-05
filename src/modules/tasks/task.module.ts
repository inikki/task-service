import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { MysqlDatabaseProviderModule } from '../providers/mysql/provider.module';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/services/users.service';

@Module({
  imports: [
    MysqlDatabaseProviderModule,
    TypeOrmModule.forFeature([Task, User]),
  ],
  controllers: [TaskController],
  providers: [TaskService, UserService],
})
export class TaskModule {}
