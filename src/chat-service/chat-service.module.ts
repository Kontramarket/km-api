import { Module } from '@nestjs/common';
import { ChatServiceService } from './chat-service.service';
import { ChatServiceGateway } from './chat-service.gateway';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessageSchema, ChatSchema } from './chat-service.model';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: 'chat',
        schema: ChatSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'chat-message',
        schema: ChatMessageSchema,
      },
    ]),
  ],
  providers: [ChatServiceGateway, ChatServiceService],
})
export class ChatServiceModule {}
