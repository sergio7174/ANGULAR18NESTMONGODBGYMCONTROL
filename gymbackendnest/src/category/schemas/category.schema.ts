/***src/category/schemas/category.schema.ts */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;

}

@Schema()
export class Category extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  image: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);