import { BusLine } from '../../bus-lines/entities/bus-line.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity('bus_line_points')
export class BusLinePoint {
  @PrimaryGeneratedColumn()
  point_id!: number;

  @ManyToOne(() => BusLine, (busLine) => busLine.points, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bus_line_id' })
  bus_line!: BusLine;

  @Column()
  bus_line_id!: number;

  @Column()
  point_order!: number;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude!: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude!: number;
}
