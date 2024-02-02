import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  FetchSingleResturantParamDto,
  RestaurantResponseDto,
  RestaurantsResponseDto,
  mapToRestaurantDto,
  mapToRestaurantsDto,
} from './dto/fetch-restaurant.dto';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @ApiCreatedResponse({
    type: RestaurantResponseDto,
  })
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.restaurantsService.create(
      createRestaurantDto,
    );

    return mapToRestaurantDto(restaurant);
  }

  @Get()
  @ApiOkResponse({
    type: RestaurantsResponseDto,
  })
  async findAll() {
    const restaurants = await this.restaurantsService.findAll();
    return { restaurants: mapToRestaurantsDto(restaurants) };
  }

  @Get(':restaurantId')
  @ApiCreatedResponse({
    type: RestaurantResponseDto,
  })
  findOne(@Param() paramData: FetchSingleResturantParamDto) {
    return this.restaurantsService.findOne(paramData.restaurantId);
  }

  @Patch(':restaurantId')
  @ApiOkResponse({
    type: RestaurantResponseDto,
  })
  update(
    @Param() paramData: FetchSingleResturantParamDto,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(
      paramData.restaurantId,
      updateRestaurantDto,
    );
  }

  @Delete(':restaurantId')
  @ApiOkResponse({
    type: RestaurantResponseDto,
  })
  remove(@Param() paramData: FetchSingleResturantParamDto) {
    return this.restaurantsService.remove(paramData.restaurantId);
  }
}
