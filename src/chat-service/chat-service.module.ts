import { Module } from '@nestjs/common';
import { ChatServiceService } from './chat-service.service';
import { ChatServiceGateway } from './chat-service.gateway';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ChatServiceGateway, ChatServiceService],
})
export class ChatServiceModule {}
