import { Module } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';
import { MailServiceController } from './mail-service.controller';

@Module({
  controllers: [MailServiceController],
  providers: [MailServiceService],
  exports: [MailServiceService],
})
export class MailServiceModule {}
