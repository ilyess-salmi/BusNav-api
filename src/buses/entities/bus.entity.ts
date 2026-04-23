import { BusLine } from "src/bus-lines/entities/bus-line.entity";
import { BusLocation } from "src/bus-locations/entities/bus-location.entity";
import { Trip } from "src/trips/entities/trip.entity";
import { Pass } from "src/passes/entities/pass.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
@Entity('buses')
export class Bus {
  @PrimaryGeneratedColumn()
  bus_id: number;

  @Column({ unique: true, length: 50 })
  plate_number: string;

  @Column('int')
  capacity: number;

  @Column({ length: 50 })
  status: string;

  @ManyToOne(() => BusLine, (line) => line.buses, { nullable: false })
  @JoinColumn({ name: 'bus_line_id' })
  busLine: BusLine;

  @OneToMany(() => BusLocation, (location) => location.bus)
  locations: BusLocation[];

  @OneToMany(() => Trip, (trip) => trip.bus)
  trips: Trip[];

  @OneToMany(() => Pass, (pass) => pass.bus)
  passes: Pass[];
}