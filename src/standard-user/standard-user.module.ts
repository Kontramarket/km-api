import { Module } from '@nestjs/common';
import { StandardUserService } from './standard-user.service';
import { StandardUserController } from './standard-user.controller';

@Module({
  controllers: [StandardUserController],
  providers: [StandardUserService],
})
export class StandardUserModule {}
