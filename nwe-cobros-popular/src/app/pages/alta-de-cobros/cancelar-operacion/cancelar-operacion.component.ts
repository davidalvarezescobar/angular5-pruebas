import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nwe-cancelar-operacion',
  templateUrl: './cancelar-operacion.component.html',
  styleUrls: ['./cancelar-operacion.component.less']
})
export class CancelarOperacionComponent implements OnInit {
  @Output() cancelar = new EventEmitter();
  @Output() guardar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
