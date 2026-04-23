import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bus } from 'src/buses/entities/bus.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Prediction } from 'src/predictions/entities/prediction.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  trip_id: number;

  @Column({ type: 'datetime' })
  start_time: Date;

  @Column({ type: 'datetime', nullable: true })
  end_time: Date;

  @Column({ length: 50 })
  trip_status: string;

  @ManyToOne(() => Bus, (bus) => bus.trips, {
    nullable: false,
  })
  @JoinColumn({ name: 'bus_id' })
  bus: Bus;

  @ManyToOne(() => Driver, (driver) => driver.trips, {
    nullable: false,
  })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @OneToMany(() => Prediction, (prediction) => prediction.trip)
  predictions: Prediction[];
}