import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileManagerController } from './file-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileManagerSchema } from './file-manager.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'file',
        schema: FileManagerSchema,
      },
    ]),
  ],
  controllers: [FileManagerController],
  providers: [FileManagerService],
})
export class FileManagerModule {}
