import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../services/types/enums';

@Entity({
  name: 'tasks',
})
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id!: string;

  @Column({
    name: 'title',
    length: 256,
  })
  title!: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'status',
  })
  status: TaskStatus;

  @Column({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  createdAt!: Date;

  @Column({
    name: 'modified_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  updatedAt!: Date;
}
