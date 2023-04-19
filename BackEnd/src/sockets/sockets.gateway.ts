import { Inject, OnModuleDestroy } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './sockets.service';
import { IPlayer } from './IPlayer';
import { ISession } from './ISession';

@WebSocketGateway({
  cors: {
    origin: true,
  },
})
export class SocketsGateway
  implements
    OnGatewayInit,
    OnModuleDestroy,
    OnGatewayConnection,
    OnGatewayDisconnect
{
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

  async handleConnection(client: Socket) {
    try {
      if (!client.handshake.query) return;
      const player = client.handshake.query as unknown as IPlayer;
      console.log(player);

      const playerInGame = this.players.some((p) => p.id === player.id);

      if (playerInGame) {
        client.disconnect();
        return;
      }

      const sessionExists = this.sessions.filter(
        (s) => s.id === player.session,
      );

      if (sessionExists[0]) {
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

      // client.on("join session", (player.session) => {
      //   client.join(player.session);
      // });

      client.emit('new user', player.id);
    } catch (e) {
      console.log(e);
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      await client.leave(client.handshake.query.sessionId.toString());
    } catch (e) {
      console.log(e);
    }
  }
}
