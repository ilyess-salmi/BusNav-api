import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { FavoritePlacesModule } from './favorite-places/favorite-places.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BusLinesModule } from './bus-lines/bus-lines.module';
import { BusStopsModule } from './bus-stops/bus-stops.module';
import { ServiceModule } from './service/service.module';
import { BusesModule } from './buses/buses.module';
import { PassesModule } from './passes/passes.module';
import { BusLocationsModule } from './bus-locations/bus-locations.module';
import { TripsModule } from './trips/trips.module';
import { PredictionsModule } from './predictions/predictions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make the .env variables available everywhere
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RolesModule,
    UsersModule,
    DriversModule,
    FavoritePlacesModule,
    NotificationsModule,
    BusLinesModule,
    BusStopsModule,
    ServiceModule,
    BusesModule,
    PassesModule,
    BusLocationsModule,
    TripsModule,
    PredictionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
