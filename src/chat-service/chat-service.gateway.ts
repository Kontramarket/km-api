import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { Public } from 'src/metadata';
import { ChatServiceService } from './chat-service.service';

@Public()
@WebSocketGateway({ cors: true })
export class ChatServiceGateway {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly chatService: ChatServiceService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('connected')
  async handleConnection(client: any) {
    const myId = await this.extractToken(client.handshake.auth.token);
    await this.userService.setStatus(myId, true);
    client.join(myId);
    const admins = await this.userService.getAdmins();
    this.server.emit('usersStatus', admins);
  }

  @SubscribeMessage('disconnecting')
  async handleDisconnection(client: any) {
    await this.userService.setStatus(
      await this.extractToken(client.handshake.auth.token),
      false,
    );
    const admins = await this.userService.getAdmins();
    this.server.emit('usersStatus', admins);
  }

  @SubscribeMessage('openChat')
  async handleJoinRoom(client: any, payload: any) {
    const myId = await this.extractToken(client.handshake.auth.token);
    const friendId = payload;
    const chat = await this.chatService.getUserChat([myId, friendId]);
    this.server.to(myId).emit('openedChat', chat._id);
  }

  @SubscribeMessage('messages')
  async handleMessages(client: any, payload: any) {
    const myId = await this.extractToken(client.handshake.auth.token);
    await this.chatService.seenBulk(payload, myId);
    const messages = await this.chatService.getMessages(payload);
    this.server.to(myId).emit('messages:' + payload, messages);
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any) {
    const myId = await this.extractToken(client.handshake.auth.token);
    const chat = await this.chatService.getUserChatById(payload.chatId);
    const newMessage = await this.chatService.newMessage(
      chat._id,
      myId,
      payload.newMessage,
    );
    chat.users.forEach((user) => {
      this.server.to(user.toString()).emit('message:' + chat._id, newMessage);
    });
  }
  @SubscribeMessage('seen')
  async handleSeen(client: any, payload: any) {
    const myId = await this.extractToken(client.handshake.auth.token);
    await this.chatService.seenBulk(payload, myId);
    const chat = await this.chatService.getUserChatById(payload);
    const messages = await this.chatService.getMessages(payload);
    chat.users.forEach((user) => {
      this.server.to(user.toString()).emit('seen:' + chat._id, messages);
    });
  }

  private async extractToken(token: string) {
    const { userId } = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    return userId;
  }
}
