/***src/staff/schemas/staff.schema.ts */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Staff {
  _id: string;
  name: string,
  email: string,
  age: number,
  id_card: string,
  phone: string,
  address: string,
  gender: string,
  field: string,
  image: string,
  createdAt: Date,
}

@Schema()
export class Staff extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  id_card: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  field: string;

  @Prop({ required: true })
  trainer: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  image: string;

}

export const StaffSchema = SchemaFactory.createForClass(Staff);
