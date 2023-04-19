import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SocketsService } from 'src/services/sockets.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private socket: SocketsService
  ) {}

  session!: string;
  player!: string;
  room = this.formBuilder.group({
    id: '',
    player: '',
  });
  ngOnInit(): void {}

  createRoom() {
    this.session = this.room?.value?.id?.toString() || '';
    this.player = this.room?.value?.player?.toString() || '';
    this.socket.connect(this.session, this.player);
  }
}
