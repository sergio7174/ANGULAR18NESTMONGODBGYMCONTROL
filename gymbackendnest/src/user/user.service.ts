import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async register({ email, password, fullName, isAdmin, image }): Promise<User> {
    console.log('Im at User Service - register -email: ' + email);
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }
    
    const newUser = new this.userModel({ 

      email,
      password, 
      fullName, 
      isAdmin, 
      image 
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async validatePassword(
    inputPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
  // get all ADmin function

  async getAllAdmin(): Promise<User[]> {
    return this.userModel.find({ isAdmin: 'true' }).exec();
  }
}
