import { Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryColumn({
    name: 'userId',
    type: 'varchar',
    length: 256,
  })
  userId!: string;
}
