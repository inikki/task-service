import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private taskRepository: Repository<User>,
  ) {}

  async create(userId: string): Promise<void> {
    // Save user
    await this.taskRepository.save({ userId });
  }
}
