import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bus } from 'src/buses/entities/bus.entity';
@Entity('bus_lines')
export class BusLine {
  @PrimaryGeneratedColumn()
  bus_line_id!: number;

  @Column({ length: 100 })
  line_name!: string;

  @Column({ length: 100 })
  start_point!: string;

  @Column({ length: 100 })
  end_point!: string;

  @OneToMany(() => Bus, (bus) => bus.busLine)
  buses!: Bus[];
}
