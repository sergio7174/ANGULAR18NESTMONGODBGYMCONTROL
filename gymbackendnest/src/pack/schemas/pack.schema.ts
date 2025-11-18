/** src/pack/schemas/pack.schema.ts */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Pack {
  _id: string;
  nameplan: string;
  trialdays: number;
  description: string;
  features: string;
  timedays: number;
  cost: number;
  code: string;
  status: string;
  image: string;
  createdAt: Date;
  finishAt: Date,
}

@Schema()
export class Pack extends Document {
  @Prop({ required: true })
  nameplan: string;

  @Prop({ required: true })
  trialdays: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  features: string;

  @Prop({ required: true })
  timedays: number;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  finishAt: Date;
}

export const PackSchema = SchemaFactory.createForClass(Pack);