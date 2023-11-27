import { Module } from '@nestjs/common';
import { TenderService } from './tender.service';
import { TenderController } from './tender.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TenderSchema } from './tender.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'tender',
        schema: TenderSchema,
      },
    ]),
  ],
  controllers: [TenderController],
  providers: [TenderService],
  exports: [TenderService],
})
export class TenderModule {}
