import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { SquareComponent } from 'src/app/square/square.component';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [BoardComponent, SquareComponent],
  imports: [CommonModule, NbButtonModule],
})
export class BoardModule {}
