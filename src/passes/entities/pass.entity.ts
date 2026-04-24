import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Bus } from 'src/buses/entities/bus.entity';
import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
@Entity('passes')
export class Pass {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Bus, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bus_id' })
  bus!: Bus;

  @ManyToOne(() => BusStop, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'stop_id' })
  stop!: BusStop;
}
