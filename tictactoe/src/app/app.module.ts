import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from 'src/app/square/square.component';
import { BoardComponent } from 'src/app/board/board.component';

@NgModule({
  declarations: [
    AppComponent
  , SquareComponent, BoardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
