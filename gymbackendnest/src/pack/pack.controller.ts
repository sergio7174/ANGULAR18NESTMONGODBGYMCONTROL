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
import { PackService } from './pack.service';
import { Request, Response } from 'express';
/*** TO HANDLE IMAGES WITH MULTER */
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/config/file-upload.config';

@Controller('pack')
export class PackController {
  constructor(private readonly packService: PackService) {}

  /*** function to create Pack document *********************************/
  @Post('')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async createClass(
    @Res() res: Response,
    @Body('nameplan') nameplan: string,
    @Body('trialdays') trialdays: number,
    @Body('description') description: string,
    @Body('features') features: string,
    @Body('timedays') timedays: number,
    @Body('cost') cost: number,
    @Body('code') code: string,
    @Body('status') status: string,
    @UploadedFile() file: Express.Multer.File,
  )
{
    console.log(
      'Im at pack.controller.ts - line 40 - go to packService.createPack')
    const NewPack: any = await this.packService.createPack( 
      nameplan,
      trialdays,
      description,
      features,
      timedays,
      cost,
      code,
      status,
      file);
    if(NewPack){ 
      console.log(
        'Im at pack.controller.ts - line 52 - Pack Created Successfully ..');
      return res
        .status(200)
        .send({ NewPack: NewPack , message: 'Pack Created Successfully ..'})
    }
    if(!NewPack){
      console.log(
        'Im at pack.controller.ts - line 57 - Pack Not Created Successfully ..');
      res.status(200).send({ message: 'Pack Not Created successfully'})
    }
  }
  /*** end of function to create Pack document *********************************/

  /***** update-class function ************************************* */
  @Put('update-pack/:id')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async updatePack(
    @Param('id') id: string, 
    @Res() res: Response,
    @Body('nameplan') nameplan: string,
    @Body('trialdays') trialdays: number,
    @Body('description') description: string,
    @Body('features') features: string,
    @Body('timedays') timedays: number,
    @Body('cost') cost: number,
    @Body('code') code: string,
    @Body('status') status: string,
    @UploadedFile() file: Express.Multer.File){
    console.log(
      'Im at pack.controller.ts - line 83 - update-pack/:id ' + id
    );
    const updatedPack: any = this.packService.updatePack( 
      id, 
      nameplan,
      trialdays,
      description,
      features,
      timedays,
      cost,
      code,
      status, 
      file);
    return res.status(200).send({ message: 'Pack updated successfully',  updatedPack })
  }


  /**** End of update pack function ******************************** */
  /**** function to get all packs ******************************** */
  @Get('listAll')
  async listAll(
    @Req()
    req: Request,
    @Res() res: Response ) 
   {
    console.log('Im at pack.controller.ts - line 73')
    const packs: any = await this.packService.findAllPacks();
    //console.log('Im at pack.controller.ts - line 75 - packs.length: ' + packs.total);
    return res.status(200).send({
      message: 'All Packs fetched successfully',
      total: packs.total,
      packs:packs.packs,
 })
  }
  /**** end of function to get all Packs ******************************** */
  /*********** function to get a class by id ********************************/
  @Get('get-single-pack/:id')
  async getClassById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response) {
    console.log('Im at classes.controller.ts - line 89 - get-single-pack/:id');
    const pack: any = await this.packService.findPackById(id);
    return res
      .status(200)
      .send({ message: 'Single Pack Fetched Successfully', pack: pack })
  }
  /*********** end of function to get a Pack by id ***************************/
/*** Delete image function *******/
  @Post('delete-image')
  async deleteImagePack(@Res() res: Response , @Body('image') image: string,) {
    const ImageDeleted: any = await this.packService.deleteImagePack( image );
    return res.status(200).json({ message: ImageDeleted });
  }
  /*** End of  Delete image function **********************************/
  /*********** Delete pack function  *********************************/ 
  @Delete('delete-pack/:id')
  async deletePack(@Param('id') id: string, @Res() res: Response) {
    const deletedPack: any =  await this.packService.deletePack(id);
     console.log(
      'Estoy en pack.controller.ts - line 108 - deletePack: ' +
        deletedPack
    );
    return res.status(200).json({ message: deletedPack });

  }
  /******************** End of Delete pack function block **************/



}
