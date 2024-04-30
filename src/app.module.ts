import { Module } from '@nestjs/common';
import { TaskModule } from './modules/tasks/task.module';
import { ConfigModule } from '@nestjs/config';
import config from '../config/init-config';

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
