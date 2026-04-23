import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';
import { FavoritePlace } from 'src/favorite-places/entities/favorite-place.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 100 })
  user_name: string;

  @Column({ unique: true, length: 150 })
  user_email: string;

  @Column({ length: 255 })
  user_password: string;

  @Column({ length: 20, nullable: true })
  user_phone: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Driver, (driver) => driver.user)
  driverProfile?: Driver;

  @OneToMany(() => FavoritePlace, (favorite) => favorite.user)
  favoritePlaces: FavoritePlace[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}