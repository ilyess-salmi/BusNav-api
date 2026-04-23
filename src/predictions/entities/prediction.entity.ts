import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Trip } from 'src/trips/entities/trip.entity';
@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn()
  pred_id: number;

  @Column({ type: 'datetime' })
  estimated_arrival_time: Date;

  @Column({ type: 'int' })
  delay_minutes: number;

  @Column('decimal', { precision: 5, scale: 2 })
  probability: number;

  @ManyToOne(() => Trip, (trip) => trip.predictions, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trip_id' })
  trip: Trip;
}