import { Module } from '@nestjs/common';
import { SupportUserService } from './support-user.service';
import { SupportUserController } from './support-user.controller';

@Module({
  controllers: [SupportUserController],
  providers: [SupportUserService],
})
export class SupportUserModule {}
