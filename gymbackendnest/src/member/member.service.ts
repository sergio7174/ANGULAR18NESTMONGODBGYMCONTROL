import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './schemas/member.schema';
import { SERVER_URL } from 'src/config/constants';
/*** imports to handle image on backend server */
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Injectable()
export class MemberService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async createMember ( 

    namemember: string,
    client_CI: string,
    email: string,
    phone: string,
    nameplan: string,
    timedays: number,
    cost: number,
    code: string,
    status: string,
    file: Express.Multer.File){

    /**** Check if user exist in database */
    const emailExists = await this.memberModel.findOne({ email });

    console.log( 'Estoy en  member.service - line 31 - emailExists:  ' 
        + emailExists);
    if (emailExists) {
        console.log('Estoy en  member.service -Dentro de emailExist- line 34 - emailExists:  '+ emailExists);
        throw new NotFoundException('User Exist ....');
    }
    /** End of block for been checking if user exist  */
    // Get the current date
    const currentDate = new Date();

    // Add timedays days to the current date

    const futureDate: any = new Date(
      currentDate.getTime() + ((timedays) * 24 * 60 * 60 * 1000)); 
    // Add timedays to get finish Member time
    // # days to finish this pack, starting with today
    const leftdays: any = new Date(currentDate.getTime() - futureDate );
    const Status = true;
    console.log('Im at member.services.ts - line 40 - leftdays:' + leftdays);

    const imagePath = file
      ? `/uploads/${file.filename}`
      : `${SERVER_URL}/uploads/image.jpg`;

    const GetMemberParams  = ({
      
      namemember: namemember,
      client_CI: client_CI,
      email: email,
      phone: phone,
      nameplan: nameplan,
      timedays: timedays,
      cost: cost,
      code: code,
      status: Status,
      leftdays: leftdays,
      createdAt: new( Date ),
      finishAt: futureDate,
      imageUser: imagePath,
   });

    const newMember: any = new this.memberModel(GetMemberParams);
    return await newMember.save();
  }
  /**** end of the block to create a Member document *******************/
  /*** function to get all packs ************************************/
  async findAllMembers(){
    console.log('Estoy en memberController - line 78 - findAllMembers');
    const members: any = await this.memberModel
      .find({})
      .limit(12)
      .sort({ createdAt: -1 });
    const total = members.length
    console.log(
      'Estoy en member.service - line 84 - members[0].namemember: '+ members[0].namemember);
    console.log('Estoy en member.service - line 86 - members[0].imageUser: '+ members[0].imageUser); 
    return { members, total };
  }
  /***** End of function to get all Members *******************************/
}
