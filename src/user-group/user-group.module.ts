import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';
import { UserGroupSchema } from './user-group.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user-group',
        schema: UserGroupSchema,
      },
    ]),
  ],
  controllers: [UserGroupController],
  providers: [UserGroupService],
  exports: [UserGroupService],
})
export class UserGroupModule {}
