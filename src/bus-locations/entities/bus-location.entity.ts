import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bus } from 'src/buses/entities/bus.entity';

@Entity('bus_locations')
export class BusLocation {
  @PrimaryGeneratedColumn()
  location_id!: number;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude!: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude!: number;

  @Column('decimal', { precision: 6, scale: 2 })
  speed!: number;

  @ManyToOne(() => Bus, (bus) => bus.locations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bus_id' })
  bus!: Bus;
}
