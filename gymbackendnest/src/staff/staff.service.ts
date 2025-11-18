import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff } from './schemas/staff.schema';
import { SERVER_URL } from 'src/config/constants';
/*** imports to handle image on backend server */
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff.name) private staffModel: Model<Staff>) {}
  
  /****function to create an Staff document ****************************/
  async createStaff ( 

    name: string,
    email: string,
    age: number,
    id_card: string,
    phone: string,
    address: string,
    gender: string,
    field: string,
    file: Express.Multer.File){

    console.log('Im at stack.services.ts - line 30 - name:' + name);

    const imagePath = file
      ? `/uploads/${file.filename}`
      : `${SERVER_URL}/uploads/image.jpg`;

    const GetStaffParams  = ({
    name: name,
    email: email,
    age: age,
    id_card: id_card,
    phone: phone,
    address: address,
    gender: gender,
    field: field,
    image: imagePath,
    createdAt: new( Date ),
   });

    const newStaff: any = new this.staffModel(GetStaffParams);
    return await newStaff.save();
  }
  /**** end of the block to create an Staff document *******************/

  /*****************  function to put(update) an staff by Id ***********************/
  async updateStaff(
    id: string, 
    name: string,
    email: string,
    age: number,
    id_card: string,
    phone: string,
    address: string,
    gender: string,
    field: string,
    file: Express.Multer.File) {
    const imagePath = file
      ? `/uploads/${file.filename}`
      : `${SERVER_URL}/uploads/image.jpg`;
    const GetStaffParams = ({
      name: name,
      email: email,
      age: age,
      id_card: id_card,
      phone: phone,
      address: address,
      gender: gender,
      field: field,
      createdAt: new( Date ),
      image: imagePath,

    });
    const updatedStaff = await this.staffModel.findByIdAndUpdate(
      id,
      GetStaffParams,
      { new: true });
    if (!updatedStaff) {
      throw new NotFoundException('Staff not found');
    }
    return updatedStaff;
  }
  /*****************  end of block function to put an staff by Id ***********************/
  /*** function to get all packs ************************************/
  async findAllStaffs(){
    console.log('Estoy en StaffController - line 92 - findAllStaffs');
    const staffs: any = await this.staffModel
      .find({})
      .limit(12)
      .sort({ createdAt: -1 });
    const total = staffs.length
    //console.log('Estoy en StaffController - line 98 - GetListAllStaffs: '+ staffs[0].name); 
    //console.log('Estoy en StaffController - line 99 - staffs.length: '+ staffs.length); 
    return { staffs, total };
  }
  /***** End of function to get all Staffs *******************************/
  /*****************  function to get an Staff by Id ***********************/
  async findStaffById(id: string){
    const staff: any = await this.staffModel.findById({ _id: id });
    console.log(
      'Estoy en staffService - line 107 - findStaffById: '+ staff.name);
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  /*********************** end of function to get an Staff by Id  *********/
  /**** function to erase image in upload dir */
  deleteImageStaff(  image: string ) {
    //const Image = image;
    const Image: string = path.basename(image);
    //const filePath = Image;
    const filePath = path.join(__dirname, '../../uploads', Image);
    /*console.log( 
          'Estoy en staff.service.ts - line 122 - deleteImageStaff - image: ' + filePath );*/
    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          /* console.log(
            'Estoy en staff.service.ts - line 127 - deleteImageStaff - File not found ');*/
          const message: string = 'File not found';
          return message;
        }
        const message: string = 'Error deleting file';
        return message;
     }
      /*console.log(
            'Estoy en staff.service.ts - line 135 - deleteImageStaff - File deleted successfully ');*/
      const message: string = 'File deleted successfully';
      return message;
    });
  }
  /**** End of block to erase image in upload dir *************************************/
  /**** funtion to delete an staff *******************************************************/
  async deleteStaff(id: string) {
    const deletedStaff = await this.staffModel.findByIdAndDelete(id);
    console.log(
      'Estoy en pack.service.ts - line 145 - deletePack : ' + deletedStaff );
    if (!deletedStaff) {
      const message: string = 'Staff not found ..';
      console.log(
        'Estoy en staff.service.ts - line 149 - deleteStaff - message : '+ message );
      return message;
    }
    const message: string = 'Staff Deleted Successfully ..';
    console.log(
      'Estoy en pack.service.ts - line 154 - deletePack - message : ' + message);
    return message;
  }
  /***** End of Block to funtion to delete an staff **************************************/

}
