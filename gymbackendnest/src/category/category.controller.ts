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
  UseInterceptors }from '@nestjs/common';
import { CategoryService } from './category.service';
import { Request, Response } from 'express';
/*** TO HANDLE IMAGES WITH MULTER */
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/config/file-upload.config';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /*** function to create category document */
  @Post('')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async createcategory(
    @Res() res: Response,
    @Body('name') name: string,
    @Body('description') description: string,
    @UploadedFile() file: Express.Multer.File,
  )
  {
    /*console.log(
      'Im at category.controller.ts - line 33 - go to categoryService.createcategory')*/
    const Newcategory: any = await this.categoryService.createcategory( 
      name,
      description,
      file);
    if(Newcategory){ 
    return res
      .status(200)
      .send({ Newcategory: Newcategory , message: 'category Created Successfully ..'})}
    if(!Newcategory){

      res.status(200).send({ message: 'category Not updated successfully'})
    }
  }
  /*** End of the block to create a new category ********************** */
  /**** function to get all categoryes ******************************** */

  @Get('listAll')
  async listAll(
    @Req()
    req: Request,
    @Res() res: Response ) 
   {
    console.log('Im at category.controller.ts - line 57')
    const categories: any = await this.categoryService.findAllCategories();
    /*console.log(
      'Im at categories.controller.ts - line 60 - categories.length: ' + 
        categories.total
    );*/
    return res.status(200).send({
      message: 'All Categories fetched successfully',
      total: categories.total,
      Categories: categories.categories,
 })
  }
  /**** end of function to get all categories *********************************/
  /*********** function to get a category by id ********************************/
  @Get('get-single-category/:id')
  async getCategoryById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response) {
    //console.log('Im at category.controller.ts - line 76 - get-single-Category/:id ');
    const category: any = await this.categoryService.findCategoryById(id);
    return res
      .status(200)
      .send({ message: 'Single Category Fetched Successfully', category: category })
  }
  /*********** end of function to get a class by id ***************************/
  /***** update-category function ************************************* */
  @Put('update-category/:id')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async updateCategory(
    @Param('id') id: string, 
    @Res() res: Response,
    @Body('name') name: string,
    @Body('description') description: string,
    @UploadedFile() file: Express.Multer.File){
    /*console.log(
      'Im at category.controller.ts - line 93 - update-category/:id '+ id);*/
    const updatedCategory: any = this.categoryService.updateCategory( 
      id, 
      name,
      description,
      file);
    return res.status(200).send({ message: 'Category updated successfully',  updatedCategory })
  }
  /**** End of update category function ******************************** */
  /*** Delete image function *******/
  @Post('delete-image')
  async deleteImageCategory(@Res() res: Response , @Body('image') image: string,) {
    const ImageDeleted:any = await this.categoryService.deleteImageCategory( image );
    //console.log(
    //  'Estoy en category.controller.ts - line 107 - ImageDeleted : ' + ImageDeleted
    //);
    return res.status(200).send({ message: ImageDeleted});
  }
  /*** End of  Delete image function **********************************/
  /*********** Delete category function  *********************************/ 
  @Delete('delete-category/:id')
  async deleteCategory(@Param('id') id: string, @Res() res: Response) {
    const deletedCategory: any =  this.categoryService.deleteCategory(id);
    /*console.log(
      'Estoy en category.controller.ts - line 118 - deleteCategory message : ' +
        deletedCategory
    );*/
    return res.status(200).json({ message: deletedCategory });

  }
  /******************** End of Delete category function block **************/
}
