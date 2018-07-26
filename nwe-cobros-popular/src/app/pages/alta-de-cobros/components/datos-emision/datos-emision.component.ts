import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'nwe-datos-emision',
  templateUrl: './datos-emision.component.html',
  styleUrls: ['./datos-emision.component.less']
})
export class DatosEmisionComponent implements OnInit {
  @Input() parent: FormGroup;
  @Output() busqueda = new EventEmitter();
  contrato_cuenta = '';
  optionsPeriodicidad = [
    {label: 'Mensual', value: 'M'},
    {label: 'Bimensual', value: 'B'},
    {label: 'Trimestral', value: 'T'},
    {label: 'Semestral', value: 'ST'},
    {label: 'Anual', value: 'A'},
    {label: 'Semanal', value: 'SM'}
  ];

  constructor() { }

  ngOnInit() {
    const contrato = this.parent.get('contrato').value;
    const cuenta = this.parent.get('cuentaVinculada').value;
    if (contrato && cuenta) {
      this.contrato_cuenta = contrato + ' / ' + cuenta;
    }
  }

}
