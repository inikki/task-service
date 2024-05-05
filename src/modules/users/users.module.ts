import { Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MysqlDatabaseProviderModule } from '../providers/mysql/provider.module';

@Module({
  imports: [MysqlDatabaseProviderModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UsersModule {}
