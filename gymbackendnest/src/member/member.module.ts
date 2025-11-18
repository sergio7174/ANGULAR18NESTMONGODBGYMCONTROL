/***src/member/member.module.ts */
import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './schemas/member.schema';
/*** import multer module */
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [
    MulterModule.register({ dest: './uploads' }),
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
})
export class MemberModule {}
