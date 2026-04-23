import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
@Entity('favorite_places')
export class FavoritePlace {
  @PrimaryGeneratedColumn()
  favorite_id: number;

  @Column({ length: 100 })
  favorite_name: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @ManyToOne(() => User, (user) => user.favoritePlaces, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
