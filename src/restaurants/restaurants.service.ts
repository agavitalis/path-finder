import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './entities/restaurant.entity';
import { Model } from 'mongoose';
import {
  CreateRestaurantDto,
  FetchRestaurantsParamDto,
  UpdateRestaurantDto,
} from './dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return await this.restaurantModel.create(createRestaurantDto);
  }

  async findAll(
    restaurantFilters: FetchRestaurantsParamDto,
  ): Promise<Array<Restaurant>> {
    const filter = {};
    filter['$or'] = [
      { city: { $regex: restaurantFilters.city, $options: 'i' } },
    ];

    if (restaurantFilters.cuisines) {
      const cousineSearch = {
        cuisines: {
          $in: [restaurantFilters.cuisines],
        },
      };
      filter['$or'].push(cousineSearch);
    }

    if (restaurantFilters.rating) {
      filter['$or'].push({
        rating: Number(restaurantFilters.rating),
      });
    }

    if (restaurantFilters.averageMealPrice) {
      filter['$or'].push({
        averageMealPrice: Number(restaurantFilters.averageMealPrice),
      });
    }

    const restaurants = await this.restaurantModel.find({
      $and: [
        {
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [
                  Number(restaurantFilters.logitude),
                  Number(restaurantFilters.latitude),
                ],
              },
              $minDistance: 0,
              $maxDistance: Number(restaurantFilters.distance),
            },
          },
        },
        {
          isDeleted: false,
          ...filter,
        },
      ],
    });
    return restaurants;
  }

  async findOne(restaurantId: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findOne({
      _id: restaurantId,
      isDeleted: false,
    });

    if (!restaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return restaurant;
  }

  async update(
    restaurantId: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const updatedRestaurant = await this.restaurantModel.findOneAndUpdate(
      {
        _id: restaurantId,
        isDeleted: false,
      },
      {
        ...updateRestaurantDto,
      },
      {
        new: true,
      },
    );

    if (!updatedRestaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return updatedRestaurant;
  }

  async remove(
    restaurantId: string,
  ): Promise<{ response: 'restaurant deleted' }> {
    const restaurant = await this.restaurantModel.findOneAndUpdate(
      {
        _id: restaurantId,
        isDeleted: false,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
    );

    if (!restaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return { response: 'restaurant deleted' };
  }
}
