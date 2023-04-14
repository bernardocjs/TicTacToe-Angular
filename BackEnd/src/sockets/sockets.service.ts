import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { IPlayer } from './IPlayer';
import { ISession } from './ISession';

@Injectable()
export class SocketService {
  public socket: Server = null;
  public players: IPlayer[] = [];
  public sessions: ISession[] = [];
}
