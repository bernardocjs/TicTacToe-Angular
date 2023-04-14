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
import { IPlayer } from './IPlayer';
import { ISession } from './ISession';

@WebSocketGateway()
export class SocketsGateway implements OnGatewayInit, OnModuleDestroy {
  constructor(@Inject(SocketService) private socketService: SocketService) {}
  players: IPlayer[] = [];
  sessions: ISession[] = [];

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.socketService.socket = server;
    this.socketService.players = this.players;
    this.socketService.sessions = this.sessions;
  }

  onModuleDestroy() {
    this.server.close();
  }

  async handleConection(client: Socket) {
    const player = client.handshake.query as unknown as IPlayer;

    const playerInGame = this.players.some((p) => p.id === player.id);

    if (playerInGame) {
      client.disconnect();
      return;
    }

    const sessionExists = this.sessions.filter((s) => s.id === player.session);

    if (sessionExists) {
      if (sessionExists[0].players.length >= 2) {
        client.disconnect();
        return;
      }
      sessionExists[0].players.push(player);

      const sessionIndex = this.sessions.findIndex(
        (s) => s.id === sessionExists[0].id,
      );
      this.sessions.splice(sessionIndex, 1, sessionExists[0]);
    } else {
      this.sessions.push({ id: player.session, players: [player] });
    }

    this.players.push(player);

    await client.join(player.session);
  }

  async handleDisconnect(client: Socket) {
    await client.leave(client.handshake.query.sessionId.toString());
  }

  async handleChange(client: Socket, payload: string[]) {
    //emit array received
    client
      .to(client.handshake.query.sessionId.toString())
      .emit('change', payload);
  }
}
