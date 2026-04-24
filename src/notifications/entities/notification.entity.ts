import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  notif_id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column('text')
  message!: string;

  @Column({ length: 50 })
  type!: string;

  @Column({ default: false })
  is_read!: boolean;

  @ManyToOne(() => User, (user) => user.notifications, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
