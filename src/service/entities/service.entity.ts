import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { BusLine } from "src/bus-lines/entities/bus-line.entity";
import { BusStop } from "src/bus-stops/entities/bus-stop.entity";
@Entity('service')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BusLine, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bus_line_id' })
  busLine: BusLine;

  @ManyToOne(() => BusStop, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stop_id' })
  stop: BusStop;
}