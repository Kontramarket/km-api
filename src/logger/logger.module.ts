import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerSchema } from './logger.model';
import { AdminSchema } from 'src/admin/admin.model';
import { TenderGroupSchema } from 'src/tender-group/tender-group.model';
import { TenderAttributeSchema } from 'src/tender-attribute/tender-attribute.model';
import { TenderSchema } from 'src/tender/tender.model';
import { UserGroupSchema } from 'src/user-group/user-group.model';
import { UserAttributeSchema } from 'src/user-attribute/user-attribute.model';
import { UserSchema } from 'src/user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'log',
        schema: LoggerSchema,
      },
      {
        name: 'admin',
        schema: AdminSchema,
      },
      {
        name: 'tender-group',
        schema: TenderGroupSchema,
      },
      {
        name: 'tender-attribute',
        schema: TenderAttributeSchema,
      },
      {
        name: 'tender',
        schema: TenderSchema,
      },
      {
        name: 'user-group',
        schema: UserGroupSchema,
      },
      {
        name: 'user-attribute',
        schema: UserAttributeSchema,
      },
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
