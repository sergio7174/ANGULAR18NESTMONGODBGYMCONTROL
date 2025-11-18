import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Classes } from './schemas/classes.schema';
import { SERVER_URL } from 'src/config/constants';
/*** imports to handle image on backend server */
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Injectable()
export class ClassesService {
  constructor( 
    @InjectModel(Classes.name) private classesModel: Model<Classes>) {}

  /****function to create a class document ****************************/

  async createClass(
    classname: string,
    code: string,
    classday: string,
    classtime: string,
    classlevel: string,
    dateBegin: Date,
    session_time: number,
    price: number,
    trainer: string,
    key_benefits: string,
    expert_trainer: string,
    class_overview: string,
    why_matters: string,
    file: Express.Multer.File) {

    // Get the current date
    const currentDate = new Date();
    const SessionTime = session_time;
    console.log(
      'Im at classes.services.ts - line 39 - createClass - SessionTime: ' + SessionTime);
    console.log(
      'Im at classes.services.ts - line 40 - createClass - currentDate : ' + currentDate);

    // Add timedays days to the current date
    const futureDate = new Date(
      // Add session_time to get finish Class time
      currentDate.getTime() + ( SessionTime * 24 * 60 * 60 * 1000 )
    );

    console.log(
      'Im at classes.services.ts - line 48 - createClass - futureDate : ' + futureDate);

    const imagePath = file
      ? `/uploads/${file.filename}`
      : `${SERVER_URL}/uploads/image.jpg`;

    const GetClassParams = ({
      classname: classname,
      code: code,
      classday: classday,
      classtime: classtime,
      classlevel: classlevel,
      dateBegin: dateBegin,
      dateEndClass: futureDate,
      session_time: session_time,
      price: price,
      trainer: trainer,
      key_benefits: key_benefits,
      expert_trainer: expert_trainer,
      why_matters: why_matters,
      class_overview: class_overview,
      createdAt: new( Date ),
      finishAt: futureDate,
      image: imagePath,

    });

    const newClass = new this.classesModel(GetClassParams);
    return newClass.save();
  }

  /**** end of the block to create a class document *******************/
  /*** function to get all classes ************************************/
  async findAllClasses(){
    console.log('Estoy en ClassController - line 82 - findAllClasss');
    const classes: any = await this.classesModel
      .find({})
      .limit(12)
      .sort({ createdAt: -1 });
    const total = classes.length
    //console.log('Estoy en ClassController - line 17 - GetListAllClasss: '+ classes[0].classname); 
    //console.log('Estoy en ClassController - line 19 - classes.length: '+ classes.length); 
    return { classes, total };
  }
  /***** End of function to get all Classes *******************************/
  /*****************  function to get a class by Id ***********************/
  async findClassById(id: string){
    const klass: any = await this.classesModel.findById({ _id: id });
    console.log(
      'Estoy en ClassesService - line 96 - findClassById: '+ klass.classname);
    if (!klass) {
      throw new NotFoundException('Class not found');
    }
    return klass;
  }

  /*********************** end of function to get a class by Id  *********/
  /*****************  function to put(update) a class by Id ***********************/

  async updateClass(
    id: string, 
    classname: any,
    code: any,
    classday: any,
    classtime: any,
    classlevel: any,
    dateBegin: any,
    session_time: any,
    price: any,
    trainer: any,
    key_benefits: any,
    expert_trainer: any,
    class_overview: any,
    why_matters: any,
    file: Express.Multer.File) {

    // Get the current date
    const currentDate = new Date();
    const SessionTime: any = session_time;

    // Add timedays days to the current date
    const futureDate = new Date(
      // Add session_time to get finish Class time
      currentDate.getTime() + ( SessionTime * 24 * 60 * 60 * 1000 )
    );
    const imagePath = file
      ? `/uploads/${file.filename}`
      : `${SERVER_URL}/uploads/image.jpg`;
    const GetClassParams = ({
      classname: classname,
      code: code,
      classday: classday,
      classtime: classtime,
      classlevel: classlevel,
      class_overview: class_overview,
      dateBegin: dateBegin,
      dateEndClass: futureDate,
      session_time: session_time,
      price: price,
      trainer: trainer,
      key_benefits: key_benefits,
      expert_trainer: expert_trainer,
      why_matters: why_matters,
      createdAt: new( Date ),
      finishAt: futureDate,
      image: imagePath,

    });
    const updateClass = await this.classesModel
    .findByIdAndUpdate(id, GetClassParams, { new: true });
    if (!updateClass) {
      throw new NotFoundException('Class not found');
    }
    return updateClass;
  }


  /*****************  end of block function to put a class by Id ***********************/

  /**** function to erase image in upload dir */
  deleteImageClass(  image: string ) {
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
  /**** End of block to erase image in upload dir *************************************/
  /**** funtion to delete a class *******************************************************/

  async deleteClass(id: string) {
    const deletedClasses = await this.classesModel.findByIdAndDelete(id);
    console.log(
      'Estoy en classes.service.ts - line 198 - deleteClass - deletedClasses : ' + deletedClasses);
    if (!deletedClasses) {
      const message: string = 'Class not found ..';
      console.log(
        'Estoy en classes.service.ts - line 202 - deleteClasses - message : ' + message);
      return message;
    }
    const message: string = 'Class Deleted Successfully ..'
    console.log(
      'Estoy en classes.service.ts - line 207 - deleteClass - message : ' + message);
    return message;
  }
  /***** End of Block to funtion to delete a class **************************************/

}