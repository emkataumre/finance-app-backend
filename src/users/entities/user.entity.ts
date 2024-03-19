import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: [Role.User] }) //otherwise the application cant start without a value for role
  role: Role;
}
