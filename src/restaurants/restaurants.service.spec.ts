import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { getModelToken } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './entities/restaurant.entity';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

describe('RestaurantService', () => {
  let restaurantsService: RestaurantsService;
  let model: Model<RestaurantDocument>;

  const mockRestaurant = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'Chicken Republic',
    address: '43 Akerele Street Naryland Lagos',
    location: {
      type: 'Point',
      coordinates: [45.124, 56.456],
    },
    cuisines: ['Rice', 'Beans'],
    rating: 5,
    averageMealPrice: 5000,
  };

  const mockRestaurantService = {
    find: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: getModelToken(Restaurant.name),
          useValue: mockRestaurantService,
        },
      ],
    }).compile();

    restaurantsService = module.get<RestaurantsService>(RestaurantsService);
    model = module.get<Model<RestaurantDocument>>(
      getModelToken(Restaurant.name),
    );
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const query = {
        city: 'Maryland',
        logitude: -73.9667,
        latitude: 40.78,
        distance: 40000,
        cuisines: 'Rice',
        rating: 4.5,
        averageMealPrice: 500,
      };

      jest.spyOn(model, 'find').mockResolvedValue([mockRestaurant]);
      const result = await restaurantsService.findAll(query);
      expect(result).toEqual([mockRestaurant]);
    });
  });

  describe('create', () => {
    it('should create and return a restaurant', async () => {
      const newRestaurant = {
        name: 'Chitis',
        address: '43 Akerele Street Maryland Lagos',
        location: {
          type: 'Point',
          coordinates: [40.7112, -74.0055],
        },
        cuisines: ['Amala', 'Rice', 'Ewedu'],
        rating: 4.6,
        averageMealPrice: 4600,
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockRestaurant as any));

      const result = await restaurantsService.create(
        newRestaurant as CreateRestaurantDto,
      );

      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('findOne', () => {
    it('should find and return a restaurant by Id', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockRestaurant);

      const result = await restaurantsService.findOne(mockRestaurant._id);

      expect(model.findOne).toHaveBeenCalledWith({
        _id: mockRestaurant._id,
        isDeleted: false,
      });
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw NotFoundException if restaurant is not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      await expect(
        restaurantsService.findOne(mockRestaurant._id),
      ).rejects.toThrow(HttpException);

      expect(model.findOne).toHaveBeenCalledWith({
        _id: mockRestaurant._id,
        isDeleted: false,
      });
    });
  });

  describe('updateById', () => {
    it('should update and return a restaurant', async () => {
      const updatedRestaurant = { ...mockRestaurant, name: 'Chitis' };
      const restaurant = { name: 'Chitis' };

      jest
        .spyOn(model, 'findOneAndUpdate')
        .mockResolvedValue(updatedRestaurant);

      const result = await restaurantsService.update(
        mockRestaurant._id,
        restaurant as any,
      );

      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: mockRestaurant._id,
          isDeleted: false,
        },
        {
          ...restaurant,
        },
        {
          new: true,
        },
      );

      expect(result.name).toEqual(restaurant.name);
    });
  });

  describe('deleteById', () => {
    it('should soft delete and return a message', async () => {
      const updatedRestaurant = {
        ...mockRestaurant,
        isDeleted: true,
        deletedAt: new Date(),
      };
      jest
        .spyOn(model, 'findOneAndUpdate')
        .mockResolvedValue(updatedRestaurant);

      const result = await restaurantsService.remove(mockRestaurant._id);

      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: mockRestaurant._id,
          isDeleted: false,
        },
        {
          isDeleted: true,
          deletedAt: new Date(),
        },
      );

      expect(result).toEqual({ response: 'restaurant deleted' });
    });
  });
});
