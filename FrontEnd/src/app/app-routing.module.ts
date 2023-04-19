import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent,
  },
  {
    path: 'room',
    component: BoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
