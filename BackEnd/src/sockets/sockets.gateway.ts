import { Inject, OnModuleDestroy } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './sockets.service';

@WebSocketGateway()
export class SocketsGateway implements OnGatewayInit, OnModuleDestroy {
  constructor(@Inject(SocketService) private socketService: SocketService) {}
  players: [] = [];

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  onModuleDestroy() {
    this.server.close();
  }

  async handleConection(client: Socket) {
    await client.join(client.handshake.query.sessionId.toString());
  }

  async handleDisconnect(client: Socket) {
    await client.leave(client.handshake.query.sessionId.toString());
  }
}
