/***src/member/schemas/member.schema.ts */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Member {
  _id: string;
  namemember: string,
  client_CI: string,
  email: string,
  phone: string,
  nameplan: string,
  timedays: number,
  cost: number,
  code: string,
  status: boolean,
  leftdays: number,
  createdAt: Date,
  imageUser: string,
  finishAt: Date,
}

@Schema()
export class Member extends Document {
  @Prop({ required: true })
  namemember: string;

  @Prop({ required: true })
  client_CI: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  nameplan: string;

  @Prop({ required: true })
  timedays: number;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true })
  leftdays: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  imageUser: string;

}

export const MemberSchema = SchemaFactory.createForClass(Member);