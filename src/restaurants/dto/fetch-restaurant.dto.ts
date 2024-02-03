import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from '../entities/restaurant.entity';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RestaurantResponseDto {
  @ApiProperty({
    description: 'The id of the restaurant',
    example: '65bc24a6ef3d6f5fc698764a',
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
    description: 'The longitude of the restaurant',
    example: 40.78,
  })
  longitude: number;

  @ApiProperty({
    description: 'The latitude of the restaurant',
    example: -74.0055,
  })
  latitude: number;
}

export class RestaurantsResponseDto {
  @ApiProperty({
    description: 'List of restaurants',
    type: [RestaurantResponseDto],
  })
  @Type(() => RestaurantResponseDto)
  restaurants: RestaurantResponseDto[];
}

export class FetchSingleRestaurantParamDto {
  @ApiProperty({
    type: 'string',
    example: '65bc24a6ef3d6f5fc698764a',
    description: 'The Restaurant Id',
  })
  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;
}

export class FetchRestaurantsParamDto {
  @ApiProperty({
    description: 'The Restaurant City or Address Name',
    example: 'Ikeja',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'The longitude of the restaurant',
    example: 40.78,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  logitude: number;

  @ApiProperty({
    description: 'The latitude of the restaurant',
    example: -73.9667,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'The Distance(in Meters) of the restaurant from the point',
    example: 40000,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  distance: number;

  @ApiProperty({
    description: 'The Restaurant Cousine Types',
    example: 'Rice',
    required: false,
  })
  @IsOptional()
  @IsString()
  cuisines: string;

  @ApiProperty({
    description: 'The Restaurant Rating',
    example: 5,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'The Restaurant Average Maeal Price',
    example: 500,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  averageMealPrice: number;
}

export const mapToRestaurantDto = (
  restaurant: Restaurant,
): RestaurantResponseDto => {
  return {
    id: restaurant._id.toString(),
    name: restaurant.name,
    address: restaurant.address,
    longitude: restaurant.location.coordinates?.[0],
    latitude: restaurant.location.coordinates?.[1],
  };
};

export const mapToRestaurantsDto = (
  restaurants: Restaurant[],
): Array<RestaurantResponseDto> => {
  return restaurants.map(mapToRestaurantDto);
};
