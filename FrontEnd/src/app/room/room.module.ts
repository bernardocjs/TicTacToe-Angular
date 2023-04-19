import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbInputModule } from '@nebular/theme';

@NgModule({
  declarations: [RoomComponent],
  imports: [CommonModule, ReactiveFormsModule, NbInputModule, NbButtonModule],
})
export class RoomModule {}
