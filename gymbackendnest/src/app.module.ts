import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/*** to handle images uploads */
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
/***** import modules */
import { DATABASE_CONNECTION } from './config/constants';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClassesModule } from './classes/classes.module';
import { PackModule } from './pack/pack.module';
import { CategoryModule } from './category/category.module';
import { StaffModule } from './staff/staff.module';
import { MemberModule } from './member/member.module';
/*** import controllers */

@Module({
  imports: [
    AuthModule, 
    UserModule,
    MongooseModule.forRoot(DATABASE_CONNECTION),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ClassesModule,
    PackModule,
    CategoryModule,
    StaffModule,
    MemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
