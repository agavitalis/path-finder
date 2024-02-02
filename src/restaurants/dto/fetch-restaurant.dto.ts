import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '../entities/restaurant.entity';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class RestaurantResponseDto {
  @ApiProperty({
    description: 'The id of the restaurant',
    example: '45b32a5f-d6a3-4c9a-a17a-1de5331eb409',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'Chitis',
  })
  name: string;

  @ApiProperty({
    description: 'The address of the restaurant',
    example: '43 Akerele Street Maryland Lagos',
  })
  address: string;

  @ApiProperty({
    description: 'The latitude of the restaurant',
    example: 40.7112,
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the restaurant',
    example: -74.0055,
  })
  longitude: number;
}

export class RestaurantsResponseDto {
  @ApiProperty({
    description: 'List of restaurants',
    type: [RestaurantResponseDto],
  })
  @Type(() => RestaurantResponseDto)
  restaurants: RestaurantResponseDto[];
}

export class FetchSingleResturantParamDto {
  @ApiProperty({
    type: 'string',
    example: '45b32a5f-d6a3-4c9a-a17a-1de5331eb409',
    description: 'The Restaurant Id',
  })
  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;
}

export const mapToRestaurantDto = (
  restaurant: Restaurant,
): RestaurantResponseDto => {
  return {
    id: restaurant._id.toString(),
    name: restaurant.name,
    address: restaurant.address,
    latitude: restaurant.location.coordinates?.[0],
    longitude: restaurant.location.coordinates?.[1],
  };
};

export const mapToRestaurantsDto = (
  restaurants: Restaurant[],
): Array<RestaurantResponseDto> => {
  return restaurants.map(mapToRestaurantDto);
};
