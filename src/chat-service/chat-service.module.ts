import { Module } from '@nestjs/common';
import { ChatServiceService } from './chat-service.service';
import { ChatServiceGateway } from './chat-service.gateway';

@Module({
  providers: [ChatServiceGateway, ChatServiceService],
})
export class ChatServiceModule {}
