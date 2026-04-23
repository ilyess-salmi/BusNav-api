import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from 'src/service/entities/service.entity';
import { Pass } from 'src/passes/entities/pass.entity';

@Entity('bus_stops')
export class BusStop {
  @PrimaryGeneratedColumn()
  stop_id: number;

  @Column({ length: 100 })
  stop_name: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @OneToMany(() => Service, (service) => service.stop)
  services: Service[];

  @OneToMany(() => Pass, (pass) => pass.stop)
  passes: Pass[];
}