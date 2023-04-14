import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketsService {
  public game$: BehaviorSubject<[]> = new BehaviorSubject([]);
  constructor() {}

  socket = io('http://localhost:3333');

  public sendMappedGame(game: [], sessionId: string) {
    this.socket.emit(sessionId, game);
  }

  public getMappedGame(sessionId: string): Observable<[]> {
    this.socket.on(sessionId, (game: []) => {
      this.game$.next(game);
    });
    return this.game$;
  }
}
