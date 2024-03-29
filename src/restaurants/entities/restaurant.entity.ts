import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Object, required: true, index: '2dsphere' })
  location: {
    type: { type: string; enum: ['Point']; default: 'Point' };
    coordinates: { type: [number] };
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
