import { Module } from '@nestjs/common';
/*** TO HANDLE JWT TOKEN  - new block ********************/
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../common/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
/******************************** END OF NEW BLOCK ******/
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
/*** import multer module */
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, ConfigService],
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    MulterModule.register({ dest: './uploads' }),
  ],
})
export class AuthModule {}
