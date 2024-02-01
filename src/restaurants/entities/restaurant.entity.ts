import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Object, required: true })
  location: {
    type: { type: string; default: 'Point' };
    coordinates: { type: Array<number> };
  };

  @Prop({ type: [String], default: null })
  cuisines: string[];

  @Prop({ type: Number, default: 5 })
  rating: number;

  @Prop({ type: Number, default: 500 })
  averageMealPrice: number;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
