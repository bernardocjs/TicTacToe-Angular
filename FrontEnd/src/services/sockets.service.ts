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
  constructor(private router: Router) {}

  connect(id: string, session: string) {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling', 'flashsocket'],
      query: {
        id,
        session,
      },
    });

    this.socket.on('connect', () => {
      console.log('Connected!');
      this.router.navigate(['/room']);
    });
  }

  disconnect() {
    this.socket.disconnect();
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
