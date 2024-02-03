import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';
import { Env } from '../src/config';

describe('Restaurant (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(Env.DB_URL).then(() => {
      mongoose.connection.db.dropDatabase();
    });
  });

  afterAll(() => mongoose.disconnect());

  const newRestaurant = {
    name: 'Chicken Republic',
    address: '43 Akerele Street Ikeja Lagos',
    location: {
      type: 'Point',
      coordinates: [40.78, -73.9667],
    },
    cuisines: ['Rice', 'Beans'],
    rating: 5,
    averageMealPrice: 5000,
  };

  let restaurantCreated;

  describe('Restaurant', () => {
    it('(POST) - Create new Restaurant', async () => {
      return await request(app.getHttpServer())
        .post('/restaurants')
        .send(newRestaurant)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.name).toEqual(newRestaurant.name);
          restaurantCreated = res.body;
        });
    });

    it('(GET) - Get all Restaurants', async () => {
      return request(app.getHttpServer())
        .get(
          '/restaurants?city=Ikeja&logitude=40.78&latitude=-73.9667&distance=40000&cuisines=Rice&rating=5&averageMealPrice=5000',
        )
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });

    it('(GET) - Get a Restaurant by ID', async () => {
      return request(app.getHttpServer())
        .get(`/restaurants/${restaurantCreated?.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });

    it('(PUT) - Update a Restaurant by ID', async () => {
      const restaurant = { name: 'Maryland Mall' };
      return request(app.getHttpServer())
        .patch(`/restaurants/${restaurantCreated?.id}`)
        .send(restaurant)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });

    it('(DELETE) - Delete a Restaurant by ID', async () => {
      return request(app.getHttpServer())
        .delete(`/restaurants/${restaurantCreated?.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });
  });
});
