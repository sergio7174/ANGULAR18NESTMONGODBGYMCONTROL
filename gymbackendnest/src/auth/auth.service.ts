import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from './schemas/user.schema';
//import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SERVER_URL } from 'src/config/constants';

export type AuthJwtPayload = {
  sub: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
   ) {}

  async register(
    email: string, 
    password: string, 
    fullName: string, 
    isAdmin: string, 
    file: Express.Multer.File
  ): Promise<User> {

    const imagePath = file
        ? `/uploads/${file.filename}`
        : `${SERVER_URL}/uploads/image.jpg`;

    console.log('Im at AuthService - line 17 - register');
    return this.userService.register({
      email,
      password,
      fullName,
      isAdmin,
      image: imagePath});
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) { 
      return null }
    const isPasswordValid = await this.userService.validatePassword(
      password, 
      user.password,);
    if (!isPasswordValid) { 
      return null }
    return { user: user };
  }

  async login(user: any, session: any) {
    session.user = user;
    const payload = { email: user.email, id: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
  async logout(session: any) {
    session.destroy();
  }
// generateTokens to get JWT token

  async generateTokens(email: string) {
    const payload: AuthJwtPayload = { sub: email };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload),
    ]);
    return { accessToken };
  }
// find all admin in database

  async getAllAdmin(): Promise<User[]> {
  return this.userService.getAllAdmin();
  }
}

