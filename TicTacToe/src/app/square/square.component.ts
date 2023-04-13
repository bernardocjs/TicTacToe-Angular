import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
   <button nbButton *ngIf="!value">{{ value }}</button>
   <button nbButton status="success" *ngIf="value=='X'" >X</button>
   <button nbButton status="info" *ngIf="value=='O'" >O</button>
   `,
  styles: [
    'button { width: 100%; height: 100%; font-color: black; font-size: 5em !important; }'
  ]
})
export class SquareComponent {

  @Input() value: 'X' | 'O' | undefined;

  chooseColor() {

  }

}
