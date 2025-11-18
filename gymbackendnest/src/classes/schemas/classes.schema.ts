/***src/classes/schemas/classes.schema.ts */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Classes {
  _id: string;
  classname: string;
  code: string;
  classday: string;
  classtime: string;
  classlevel: string;
  dateBegin: Date;
  session_time: number;
  price: number;
  trainer: string;
  key_benefits: string;
  expert_trainer: string;
  class_overview: string;
  why_matters: string;
  image: string;
  dateEndClass: Date;
  createdAt: Date;
}

@Schema()
export class Classes extends Document {
  @Prop({ required: true })
  classname: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  classday: string;

  @Prop({ required: true })
  classtime: string;

  @Prop({ required: true })
  classlevel: string;

  @Prop({ required: true })
  dateBegin: Date;

  @Prop({ required: true })
  session_time: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  trainer: string;

  @Prop({ required: true })
  key_benefits: string;

  @Prop({ required: true })
  expert_trainer: string;

  @Prop({ required: true })
  class_overview: string;

  @Prop({ required: true })
  why_matters: string;

  @Prop({ required: true })
  dateEndClass: Date;
  
  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  image: string;

}

export const ClassesSchema = SchemaFactory.createForClass(Classes);
