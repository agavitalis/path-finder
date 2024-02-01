import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ResturantsModule } from './resturants/resturants.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [RestaurantModule, ResturantsModule, RestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
