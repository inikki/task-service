import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { MysqlDatabaseProviderModule } from '../../providers/mysql/provider.module';

@Module({
  imports: [MysqlDatabaseProviderModule, TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
