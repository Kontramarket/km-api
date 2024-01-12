import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@WebSocketGateway({ cors: true })
export class ChatServiceGateway {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('connected')
  async handleConnection(client: any, payload: any) {
    const selfStatus = await this.userService.setStatus(
      await this.extractToken(client.handshake.auth.token),
      true,
    );
    const admins = await this.userService.getAdmins();
    this.server.emit('usersStatus', admins);
  }

  @SubscribeMessage('disconnecting')
  async handleDisconnection(client: any, payload: any) {
    const selfStatus = await this.userService.setStatus(
      await this.extractToken(client.handshake.auth.token),
      false,
    );
    const admins = await this.userService.getAdmins();
    this.server.emit('usersStatus', admins);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    this.server.emit('message', payload); // Broadcast message to all connected clients
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: any, payload: any): void {
    //client.join(payload);
  }

  private async extractToken(token: string) {
    const { userId } = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    return userId;
  }
}
