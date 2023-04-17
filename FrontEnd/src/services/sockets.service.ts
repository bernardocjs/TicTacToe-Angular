import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketsService {
  public game: BehaviorSubject<[]> = new BehaviorSubject([]);
  public socket!: Socket;
  constructor() {}

  connect(id: string, session: string) {
    this.socket = io('http://localhost:3333', {
      transports: ['websocket'],
      query: {
        player: {
          id,
          session,
        },
      },
    });

    this.socket.on('connect', function () {
      console.log('Connected!');
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  public sendMappedGame(game: [], sessionId: string) {
    this.socket.emit(sessionId, game);
  }

  public getMappedGame(sessionId: string) {
    return new Observable((observer) => {
      this.socket.on(sessionId, (msg) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }
}
