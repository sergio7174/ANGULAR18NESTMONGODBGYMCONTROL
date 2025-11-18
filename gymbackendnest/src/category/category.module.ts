/***src/category/category.module.ts */
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
/*** import multer module */
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    MulterModule.register({ dest: './uploads' }),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
})
export class CategoryModule {}
