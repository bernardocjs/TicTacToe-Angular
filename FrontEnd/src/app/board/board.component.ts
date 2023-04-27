import { Component, Input, OnInit } from '@angular/core';
import { SocketsService } from 'src/services/sockets.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  constructor(private socketsService: SocketsService) {}

  squares: any[] = [];
  xIsNext: boolean = false;
  winner!: string | null;
  playerId!: string;
  sessionId!: string;

  @Input() final!: boolean;

  ngOnInit(): void {
    this.playerId = this.socketsService.player.id;
    this.sessionId = this.socketsService.player.session;
    this.newGame();
  }

  newGame() {
    this.socketsService.connect('id', 'sessao');
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  playerMove(i: number) {
    if (!this.winner) {
      if (!this.squares[i]) {
        this.squares.splice(i, 1, this.player); //substitui no index clicado com o player
        this.xIsNext = !this.xIsNext;

        this.winner = this.calculateWinner();
        this.socketsService.sendMappedGame(this.sessionId, this.squares);
      }
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    if (!this.squares.includes(null)) return 'Ninguem';
  }
}
