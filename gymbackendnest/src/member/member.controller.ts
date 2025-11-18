import { 
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  Res,
  UploadedFile,
  UseInterceptors}
from '@nestjs/common';
import { MemberService } from './member.service';
import { Request, Response } from 'express';
/*** TO HANDLE IMAGES WITH MULTER */
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/config/file-upload.config';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  /*** function to create a Member document *********************************/
  @Post('')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async createMember(
    @Res() res: Response,
    @Body('namemember') namemember: string,
    @Body('client_CI') client_CI: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('nameplan') nameplan: string,
    @Body('timedays') timedays: number,
    @Body('cost') cost: number,
    @Body('code') code: string,
    @Body('status') status: string,
    @UploadedFile() file: Express.Multer.File,
  )
{
    console.log(
      'Im at member.controller.ts - line 42 - go to memberService.createMember')
    const NewMember: any = await this.memberService.createMember(
      namemember,
      client_CI,
      email,
      phone,   
      nameplan,
      timedays,
      cost,
      code,
      status,
      file);
    if(NewMember){ 
      console.log(
        'Im at member.controller.ts - line 56 - Member Created Successfully ..');
      return res
        .status(200)
        .send({ NewMember: NewMember , message: 'Member Created Successfully ..'})
    }
    if(!NewMember){
      console.log(
        'Im at member.controller.ts - line 63 - Member Not Created Successfully ..');
      res.status(200).send({ message: 'Member Not Created successfully'})
    }
  }
  /*** end of function to create a Member document *********************************/
  /**** function to get all packs ******************************** */
  @Get('listAll')
  async listAll(
    @Req()
    req: Request,
    @Res() res: Response ) 
   {
    console.log('Im at member.controller.ts - line 75')
    const members: any = await this.memberService.findAllMembers();
    console.log(
      'Im at member.controller.ts - line 77 - members.length: ' + members.total);
    return res.status(200).send({
      message: 'All Members fetched successfully',
      total: members.total,
      Members: members.members,
 })
  }
  /**** end of function to get all Members  ******************************** */

}
