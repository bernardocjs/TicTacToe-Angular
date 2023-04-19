import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { SocketsService } from 'src/services/sockets.service';
import { RoomModule } from './room/room.module';
import { BoardModule } from './board/board.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbButtonModule,
    NbEvaIconsModule,
    RoomModule,
    BoardModule,
  ],
  providers: [SocketsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
