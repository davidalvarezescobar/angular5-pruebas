import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeudor } from '../../../data-model';

@Component({
  selector: 'nwe-listado-deudores',
  templateUrl: './listado-deudores.component.html',
  styleUrls: ['./listado-deudores.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListadoDeudoresComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() deudores: IDeudor[];
  @Output() selected = new EventEmitter();
  @Output() suma = new EventEmitter();
  indice: number;

  constructor() { }

  ngOnInit() {
  }

  selectDeudor(i) {
    this.indice = i;
    this.selected.emit(i);
    console.log(i);
  }

  get importeTotal() {
    let sumatorio = 0.00;
    this.deudores.map(deudor => {
      sumatorio = +((sumatorio * 10 + deudor.importe * 10) / 10).toFixed(2);
    });
    this.suma.emit(sumatorio);
    return sumatorio;
  }
}
