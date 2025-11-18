/***src/pack/pack.module.ts */
import { Module } from '@nestjs/common';
import { PackController } from './pack.controller';
import { PackService } from './pack.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pack, PackSchema } from './schemas/pack.schema';
/*** import multer module */
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [PackController],
  providers: [PackService],
  imports: [
    MulterModule.register({ dest: './uploads' }),
    MongooseModule.forFeature([{ name: Pack.name, schema: PackSchema }]),
  ],
})
export class PackModule {}
