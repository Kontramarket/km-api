import { Module } from '@nestjs/common';
import { TenderAttributeService } from './tender-attribute.service';
import { TenderAttributeController } from './tender-attribute.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TenderAttributeSchema } from './tender-attribute.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'tender-attribute',
        schema: TenderAttributeSchema,
      },
    ]),
  ],
  controllers: [TenderAttributeController],
  providers: [TenderAttributeService],
  exports: [TenderAttributeService],
})
export class TenderAttributeModule {}
