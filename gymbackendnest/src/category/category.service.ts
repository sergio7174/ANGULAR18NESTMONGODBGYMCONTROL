import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { SERVER_URL } from 'src/config/constants';
/*** imports to handle image on backend server */
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Injectable()
export class CategoryService {
  constructor( 
    @InjectModel(Category.name) private categoryModel: Model<Category>){}
  /****function to create a category document ****************************/
  async createcategory(
    name: string,
    description: string,
    file: Express.Multer.File) {
    console.log('Im at category.services.ts - line 22 - createClass');
    const imagePath = file
      ? `/uploads/${file.filename}`
      : `${SERVER_URL}/uploads/image.jpg`;
    const GetCategoryParams = ({
      name: name,
      description: description,
      createdAt: new( Date ),
      image: imagePath,

    });

    const newCategory = new this.categoryModel(GetCategoryParams);
    return newCategory.save();
  }

  /**** end of the block to create a category document *******************/
  /*****************  function to put(update) a category by Id ***********************/
    async updateCategory(
      id: string, 
      name: any,
      description: any,
      file: Express.Multer.File) {
      const imagePath = file
        ? `/uploads/${file.filename}`
        : `${SERVER_URL}/uploads/image.jpg`;
      const GetCategoryParams = ({
        name: name,
        description: description,
        createdAt: new( Date ),
        image: imagePath,
  
      });
      const updateCategory = await this.categoryModel
      .findByIdAndUpdate(id, GetCategoryParams, { new: true });
      if (!updateCategory) {
        throw new NotFoundException('Category not found');
      }
      return updateCategory;
    }
  
  
    /*****************  end of block function to put a category by Id ***********************/
  /*** function to get all categories ************************************/
  async findAllCategories(){
    console.log('Estoy en CategoriesController - line 40 - findAllCategories');
    const categories: any = await this.categoryModel
      .find({})
      .limit(12)
      .sort({ createdAt: -1 });
    const total = categories.length
    /*console.log(
      'Estoy en CategoryController - line 46 - findAllCategories: '+ categories[0]. name); 
    console.log(
      'Estoy en CategoryController - line 49 - categories.length: '+ categories.length); */
    return { categories, total };
  }
  /***** End of function to get all Categories *******************************/
  /*****************  function to get a category by Id ***********************/
  async findCategoryById(id: string){
    const category: any = await this.categoryModel.findById({ _id: id });
    /*console.log(
      'Estoy en CategoryService - line 84 - findCategoryById: '+ category.name);*/
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  /*********************** end of function to get a category by Id  *********/
  /**** function to erase image in upload dir */
  deleteImageCategory(  image: string ) {

    //const Image = image;
    const Image: string = path.basename(image);
    //const filePath = Image;
    const filePath = path.join(__dirname, '../../uploads', Image);
    /*console.log( 
      'Estoy en category.service.ts - line 101 - deleteImageCategory - image: ' + filePath );*/
    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
    /* console.log(
            'Estoy en category.service.ts - line 106 - deleteImageCategory - File not found ');*/
          const message: string = 'File not found';
          return message;
        }
        const message: string = 'Error deleting file';
        return message;
      }
      /*console.log(
        'Estoy en category.service.ts - line 113 - deleteImageCategory - File deleted successfully ');*/
      const message: string = 'File deleted successfully';
      return message;
    });
  }
  /**** End of block to erase image in upload dir ******************************************/
  /**** funtion to delete a category *******************************************************/
  async deleteCategory(id: string) {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
    /*console.log(
      'Estoy en category.service.ts - line 122 - deleteCategory : ' + deletedCategory);*/
    if (!deletedCategory) {
      const message: string = 'Category not found ..';
      /*console.log(
        'Estoy en category.service.ts - line 126 - deleteCategory - message : ' + message);*/
      return message;
    }
    const message: string = 'Category Deleted Successfully ..'
    /*console.log(
      'Estoy en category.service.ts - line 207 - deleteCategory - message : ' + message);*/
    return message;
  }
  /***** End of Block to funtion to delete a category **************************************/

}
