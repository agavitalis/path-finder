import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  FetchRestaurantsParamDto,
  FetchSingleRestaurantParamDto,
  RestaurantResponseDto,
  RestaurantsResponseDto,
  mapToRestaurantDto,
  mapToRestaurantsDto,
} from './dto/index';

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
  async findAll(@Query() restaurantFilters: FetchRestaurantsParamDto) {
    const restaurants = await this.restaurantsService.findAll(
      restaurantFilters,
    );
    return { restaurants: mapToRestaurantsDto(restaurants) };
  }

  @Get(':restaurantId')
  @ApiCreatedResponse({
    type: RestaurantResponseDto,
  })
  findOne(@Param() paramData: FetchSingleRestaurantParamDto) {
    return this.restaurantsService.findOne(paramData.restaurantId);
  }

  @Patch(':restaurantId')
  @ApiOkResponse({
    type: RestaurantResponseDto,
  })
  update(
    @Param() paramData: FetchSingleRestaurantParamDto,
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
  remove(@Param() paramData: FetchSingleRestaurantParamDto) {
    return this.restaurantsService.remove(paramData.restaurantId);
  }
}
