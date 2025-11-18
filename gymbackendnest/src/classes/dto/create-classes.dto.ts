import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateClassesDto {
  @IsString()
  classname: string;

  @IsString()
  code: string;

  @IsString()
  classday: string;

  @IsString()
  classtime: string;

  @IsString()
  classlevel: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateBegin: Date;

  @IsNumber()
  price: number;

  @IsString()
  session_time: string;

  @IsString()
  trainer: string;

  @IsString()
  key_benefits: string;

  @IsString()
  expert_trainer: string;

  @IsString()
  class_overviewr: string;

  @IsString()
  why_matters: string;

  @IsString()
  image: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateEndClass: Date;
}
