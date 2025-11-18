// src/classes/classes.module.ts
import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Classes, ClassesSchema } from './schemas/classes.schema';
/*** import multer module */
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [
    MulterModule.register({ dest: './uploads' }),
    MongooseModule.forFeature([{ name: Classes.name, schema: ClassesSchema }]),
  ],
})
export class ClassesModule {}
