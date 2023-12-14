import { Module } from '@nestjs/common';
import { UserAttributeService } from './user-attribute.service';
import { UserAttributeController } from './user-attribute.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAttributeSchema } from './user-attribute.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user-attribute',
        schema: UserAttributeSchema,
      },
    ]),
  ],
  controllers: [UserAttributeController],
  providers: [UserAttributeService],
  exports: [UserAttributeService],
})
export class UserAttributeModule {}
