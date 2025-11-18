import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
/*** TO HANDLE IMAGES WITH MULTER */
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/config/file-upload.config';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  async register(
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('isAdmin') isAdmin: string,
    //@Body('image') image: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(
      'Im at auth controller - line 31 -Request body- fullName:' + fullName)
    console.log(
      'Im at auth controller - line 33 -Request body- Uploaded file:' + file
    ); // This should show the file object
    const newUser = await this.authService.register(
      email,
      password,
      fullName,
      isAdmin,
      file);
    console.log('Im at auth.controller-register-line 24');
    console.log('- User registered successfully: ');
    return { message: 'User registered successfully', newUser };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    
    //console.log('Im at auth.controller-login-line 28- email: ' + email);
    
    const NewDatauser = await this.authService.validateUser(email, password);

    if (!NewDatauser) {
      console.log('Im at auth.controller-login-line 34- Invalid credentials: ');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //const newUser = await this.authService.login(user, req.session);
    const loginResponse = await this.authService.login(
      NewDatauser,
      req.session);
    const token: any = loginResponse.access_token;
    //console.log('Im at auth.controller-login-line 42- user.email : ' + NewDatauser.email);
    //console.log('Im at auth.controller-login-line 43- token : ' + token);
    return res.status(200).json({user:NewDatauser.user, message: 'User Login Successfully ..',token:token});
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid', { path: '/' });
      console.log('Im at auth.controller-logOut-line 44- Logout successful ');
      return res.status(200).json({ message: 'Logout successful' });
    });
  }

  @Get('getalladmin')
 
  async getalladmin(@Req() req: Request, @Res() res: Response) {

     console.log('Im at auth.controller-get all admin -line 70: ');
    const isAdmin = await this.authService.getAllAdmin();

    if (!isAdmin) {
      console.log('Im at auth.controller-get all admin -line 71- No Admin: ');
      return res.status(401).json({ message: 'No Admin' });
    }  
    console.log('Im at auth.controller-get all admin -line 74- isAdmin[0].email: '+isAdmin[0].email);
    return res.status(200).json({ haveAdmin: isAdmin })
  }
}


