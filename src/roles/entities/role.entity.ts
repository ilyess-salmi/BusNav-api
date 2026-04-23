import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;
  

  @Column({ unique: true, length: 50 })
  role_name: string;

  

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}