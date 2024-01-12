import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { MailServiceService } from 'src/mail-service/mail-service.service';
import { UserGroupSchema } from 'src/user-group/user-group.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'user-group',
        schema: UserGroupSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    MailServiceService,
  ],
  exports: [UserService],
})
export class UserModule {}
