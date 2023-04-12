import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
   <button nbButton *ngIf="value">{{ value }}</button>
   <!-- <button nbButton *ngIf="value=='X'" status="success">X</button>
   <button nbButton *ngIf="value=='O'" status="info">X</button> -->
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
