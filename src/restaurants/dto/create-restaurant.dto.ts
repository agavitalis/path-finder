import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class LocationDto {
  @ApiProperty({
    description: 'The type of location coordinates',
    example: 'Chitis',
    required: true,
    default: 'Point',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The location Latitude and Logitude Points',
    example: [40.7112, -74.0055],
    required: true,
  })
  @IsNumber({}, { each: true })
  coordinates: Array<number>;
}

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'The restaurant name',
    example: 'Chitis',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The restaurant address',
    example: '43 Akerele Street Maryland Lagos',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'The location points of the resturants',
    example: {
      type: 'Point',
      coordinates: [40.7112, -74.0055],
    },
    type: LocationDto,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({
    description: 'List of Cuisines offered by resturant',
    example: ['Amala', 'Rice', 'Ewedu'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cuisines: string[];

  @ApiProperty({
    description: 'Resturant rating',
    example: 4.6,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'Resturant averaage meal price',
    example: 4600,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  averageMealPrice: number;
}
