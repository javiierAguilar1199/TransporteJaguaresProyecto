import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msj-borrar',
  templateUrl: './msj-borrar.component.html',
  styleUrls: ['./msj-borrar.component.scss']
})
export class MsjBorrarComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: { msg: string }) {


  }
  get msg(): string {
    return this.data.msg;
  }
}
