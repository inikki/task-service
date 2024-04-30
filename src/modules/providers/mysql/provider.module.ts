import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from 'config/interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config, true>) => {
        return {
          type: 'mysql',
          host: configService.get('db.mysql.host', { infer: true }),
          port: configService.get('db.mysql.port', { infer: true }),
          username: configService.get('db.mysql.userName', { infer: true }),
          password: configService.get('db.mysql.password', { infer: true }),
          database: configService.get('db.mysql.databaseName', { infer: true }),
          entities: ['dist/**/**.entity{.ts,.js}'],
          synchronize: true, // in production false and migrations needs to be created
        };
      },
    }),
  ],
})
export class MysqlDatabaseProviderModule {}
