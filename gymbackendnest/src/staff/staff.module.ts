/***src/staff/staff.module.ts */
import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './schemas/staff.schema';
/*** import multer module */
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [StaffController],
  providers: [StaffService],
  imports: [
    MulterModule.register({ dest: './uploads' }),
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
  ],
})
export class StaffModule {}
