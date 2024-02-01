import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  location: {
    type: { type: string; default: 'Point' };
    coordinates: { type: Array<number> };
  };

  @Prop({ default: null })
  cuisines: string[];

  @Prop({ default: 5 })
  rating: number;

  @Prop({ default: 500 })
  averageMealPrice: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: null })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Restaurant);
