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
import { StaffService } from './staff.service';
import { Request, Response } from 'express';
/*** TO HANDLE IMAGES WITH MULTER */
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/config/file-upload.config';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  /*** function to create an Staff document *********************************/
  @Post('')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async createClass(
    @Res() res: Response,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('age') age: number,
    @Body('id_card') id_card: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('gender') gender: string,
    @Body('field') field: string,
    @UploadedFile() file: Express.Multer.File,
  )
{
    console.log(
      'Im at staff.controller.ts - line 41 - go to staffService.createStaff')
    const NewStaff: any = await this.staffService.createStaff( 
      name,
      email,
      age,
      id_card,
      phone,
      address,
      gender,
      field,
      file);
    if(NewStaff){ 
      console.log(
        'Im at staff.controller.ts - line 54 - Staff Created Successfully ..');
      return res
        .status(200)
        .send({ NewStaff: NewStaff , message: 'Staff Created Successfully ..'})
    }
    if(!NewStaff){
      console.log(
        'Im at staff.controller.ts - line 61 - Staff Not Created Successfully ..');
      res.status(200).send({ message: 'Staff Not Created successfully'})
    }
  }
  /*** end of function to create Staff document *********************************/
  /***** update-class function ************************************* */
  @Put('update-staff/:id')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async updatePack(
    @Param('id') id: string, 
    @Res() res: Response,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('age') age: number,
    @Body('id_card') id_card: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('gender') gender: string,
    @Body('field') field: string,
    @UploadedFile() file: Express.Multer.File){
    console.log(
      'Im at staff.controller.ts - line 81 - update-staff/:id ' + id);
    const updatedStaff: any = this.staffService.updateStaff( 
      id,
      name,
      email,
      age,
      id_card,
      phone,
      address,
      gender,
      field,
      file);
    return res.status(200).send({ message: 'Staff updated successfully',  updatedStaff })
  }
  /**** End of update staff function ******************************** */
  /**** function to get all packs ******************************** */
  @Get('listAll')
  async listAll(
    @Req()
    req: Request,
    @Res() res: Response ) 
   {
    console.log('Im at staff.controller.ts - line 73')
    const staffs: any = await this.staffService.findAllStaffs();
    console.log(
      'Im at staff.controller.ts - line 75 - staffs.length: ' + staffs.total);
    return res.status(200).send({
      message: 'All Staff fetched successfully',
      total: staffs.total,
      Staffs: staffs.staffs,
 })
  }
  /**** end of function to get all Staffs ******************************** */
  /*********** function to get a class by id ********************************/
  @Get('get-single-staff/:id')
  async getStaffById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response) {
    console.log('Im at staff.controller.ts - line 90 - get-single-staff/:id');
    const staff: any = await this.staffService.findStaffById(id);
    return res
      .status(200)
      .send({ message: 'Single Staff Fetched Successfully', staff: staff })
  }
  /*********** end of function to get an Staff by id ***************************/
  /*** Delete image function *******/
  @Post('delete-image')
  async deleteImageStaff(@Res() res: Response , @Body('image') image: string,) {
    const ImageDeleted: any = await this.staffService.deleteImageStaff( image );
    return res.status(200).json({ message: ImageDeleted });
  }
  /*** End of  Delete image function **********************************/
  /*********** Delete staff function  *********************************/ 
  @Delete('delete-staff/:id')
  async deleteStaff(@Param('id') id: string, @Res() res: Response) {
    const deletedStaff: any =  await this.staffService.deleteStaff(id);
    console.log(
      'Estoy en staff.controller.ts - line 109 - deleteStaff: ' +
      deletedStaff
    );
    return res.status(200).json({ message: deletedStaff });

  }
  /******************** End of Delete staff function block **************/


}
