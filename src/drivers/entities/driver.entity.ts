import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Trip } from 'src/trips/entities/trip.entity';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  driver_id!: number;

  @OneToOne(() => User, (user) => user.driverProfile, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ unique: true, length: 100 })
  license_number!: string;

  @OneToMany(() => Trip, (trip) => trip.driver)
  trips!: Trip[];
}
