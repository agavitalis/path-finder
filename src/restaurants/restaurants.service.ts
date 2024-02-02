import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './entities/restaurant.entity';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return await this.restaurantModel.create(createRestaurantDto);
  }

  async findAll() {
    return await this.restaurantModel.find({ isDeleted: false });
  }

  async findOne(restaurantId: string) {
    const restaurant = await this.restaurantModel.findOne({
      _id: restaurantId,
      isDeleted: false,
    });

    if (!restaurant) {
      throw new HttpException('FAQ not found', HttpStatus.NOT_FOUND);
    }

    return restaurant;
  }

  async update(restaurantId: string, updateRestaurantDto: UpdateRestaurantDto) {
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

  async remove(restaurantId: string) {
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

    return restaurant;
  }
}
