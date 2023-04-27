import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocketsService {
  public game: BehaviorSubject<[]> = new BehaviorSubject([]);
  public socket!: Socket;
  public player!: { id: string; session: string };
  constructor(private router: Router) {}

  connect(session: string, id: string) {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling', 'flashsocket'],
      query: {
        id,
        session,
      },
    });

    this.socket.on('connect', () => {
      console.log('Connected!');
      this.player = { session, id };
      if (this.player.id && this.player.session)
        this.router.navigate(['/room']);
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  public getMappedGame(sessionId: string) {
    this.socket.on('new user', (msg) => {
      console.log(msg);
    });
  }

  public sendMappedGame(sessionId: string, game: any) {
    this.socket.emit('action', sessionId, game);
  }
}
