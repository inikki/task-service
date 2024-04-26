import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'demo',
      database: 'restapi',
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: true, // in production false and migrations needs to be created
    }),
  ],
})
export class MysqlDatabaseProviderModule {}
