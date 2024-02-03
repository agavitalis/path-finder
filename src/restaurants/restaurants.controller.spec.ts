import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

describe('RestaurantsController', () => {
  let restaurantService: RestaurantsService;
  let restaurantController: RestaurantsController;

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

  const mockRestaurantDto = {
    id: '61c0ccf11d7bf83d153d7c06',
    name: 'Chicken Republic',
    address: '43 Akerele Street Naryland Lagos',
    latitude: 56.456,
    longitude: 45.124,
  };

  const mockRestaurantsService = {
    findAll: jest.fn().mockResolvedValueOnce([mockRestaurant]),
    create: jest.fn(),
    findOne: jest.fn().mockResolvedValueOnce(mockRestaurant),
    update: jest.fn(),
    remove: jest.fn().mockResolvedValueOnce({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsService,
          useValue: mockRestaurantsService,
        },
      ],
    }).compile();

    restaurantService = module.get<RestaurantsService>(RestaurantsService);
    restaurantController = module.get<RestaurantsController>(
      RestaurantsController,
    );
  });

  it('should be defined', () => {
    expect(restaurantController).toBeDefined();
  });

  describe('getAllRestaurants', () => {
    it('should get all restaurants', async () => {
      const result = await restaurantController.findAll({
        city: 'Maryland',
        logitude: -73.9667,
        latitude: 40.78,
        distance: 40000,
        cuisines: 'Rice',
        rating: 4.5,
        averageMealPrice: 500,
      });

      expect(restaurantService.findAll).toHaveBeenCalled();
      expect(result.restaurants).toEqual([mockRestaurantDto]);
    });
  });

  describe('createRestaurant', () => {
    it('should create a new restaurant', async () => {
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

      mockRestaurantsService.create = jest
        .fn()
        .mockResolvedValueOnce(mockRestaurant);

      const result = await restaurantController.create(
        newRestaurant as CreateRestaurantDto,
      );

      expect(restaurantService.create).toHaveBeenCalled();
      expect(result).toEqual(mockRestaurantDto);
    });
  });

  describe('getRestaurantById', () => {
    it('should get a restaurant by ID', async () => {
      const result = await restaurantController.findOne({
        restaurantId: mockRestaurant._id,
      });

      expect(restaurantService.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('updateRestaurant', () => {
    it('should update restaurant by its ID', async () => {
      const updatedRestaurant = { ...mockRestaurant, name: 'Maryland Mall' };
      const restaurant = { name: 'Maryland Mall' };

      mockRestaurantsService.update = jest
        .fn()
        .mockResolvedValueOnce(updatedRestaurant);

      const result = await restaurantController.update(
        {
          restaurantId: mockRestaurant._id,
        },
        restaurant as UpdateRestaurantDto,
      );

      expect(restaurantService.update).toHaveBeenCalled();
      expect(result).toEqual(updatedRestaurant);
    });
  });

  describe('deleteRestaurant', () => {
    it('should delete a restaurant by ID', async () => {
      const result = await restaurantController.remove({
        restaurantId: mockRestaurant._id,
      });

      expect(restaurantService.remove).toHaveBeenCalled();
      expect(result).toEqual({ deleted: true });
    });
  });
});
