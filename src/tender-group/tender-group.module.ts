import { Module } from '@nestjs/common';
import { TenderGroupService } from './tender-group.service';
import { TenderGroupController } from './tender-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TenderGroupSchema } from './tender-group.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'tender-group',
        schema: TenderGroupSchema,
      },
    ]),
  ],
  controllers: [TenderGroupController],
  providers: [TenderGroupService],
  exports: [TenderGroupService],
})
export class TenderGroupModule {}
