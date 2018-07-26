import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AltaDeCobrosService } from '../../alta-de-cobros.service';

@Component({
  selector: 'nwe-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.less']
})
export class DeudoresComponent implements OnInit {
  form: FormGroup = this.fb.group({
    nombre: '',
    referencia: '',
    concepto: '',
    contrato_iban: '',
    codPais: 'ES',
    entidad: '',
    sucursal: '',
    digito: '',
    cuenta: '',
    codigoDevolucion: '',
    importe: '',
    moneda: 'EUR'
  });
  configHeader = {
    title: 'Nuevo deudor'
  };
  configAmount = {
    integerSize: 15,
    decimalSize: 2
  };

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private altaService: AltaDeCobrosService
  ) { }

  ngOnInit() {
    const deudor = this.altaService.getDeudor();
    if (deudor) {
      this.form.setValue(deudor);
    }
  }

  onSubmit() {
    const deudor = this.form.value;
    deudor.contrato_iban = deudor.codPais + deudor.entidad + deudor.sucursal + deudor.digito + deudor.cuenta;
    this.altaService.validarDeudor(deudor).subscribe(resultado => {
      if (resultado.exist) {
        this.altaService.saveDeudor(deudor);
        this.location.back();
      }
    });
  }

  cancelar() {
    this.location.back();
  }

    // Funcionalidad del input number
  // Elimina los puntos(separador de miles).
  removeDots(model) {
    if (model) {
    const result = model.replace(/\./g, '');

     this.form.patchValue({
        importe: result,
      });

    }
  }

  // Funcionalidad del input number
  // Formatea el importe en separador miles y decimales.
  format(model) {
    if (model) {
      const separadorMillares = '.';
      const separadorDecimal = ',';
      const decimalSize = this.configAmount.decimalSize;

      const result = parseFloat(model.replace(/\./g, '').replace(',', '.')).numberFormat(decimalSize, separadorDecimal, separadorMillares);


        this.form.patchValue({
          importe: result,
        });

    }
  }

  // Funcionalidad del input number
  // En cada pulsación de tecla comprueba que sea un caracterer numérico.
  mask(event, model) {

      // Convert charCode to char
      const char = String.fromCharCode(event.charCode);

      // Get future value
      const selectionStart = event.currentTarget.selectionStart;
      const selectionEnd = event.currentTarget.selectionEnd;
      let newValue = char;
      if(model) {
        newValue = model.substring(0, selectionStart) + char + model.substring(selectionEnd);
      }

      // Apply mask
      let regExpString = '[0-9]{1,$integerSize}(\,[0-9]{0,$decimalSize})?';

      regExpString = regExpString.replace('$integerSize', this.configAmount.integerSize.toString());
      regExpString = regExpString.replace('$decimalSize', this.configAmount.decimalSize.toString());

      const regExp = new RegExp(regExpString);
      const matches = newValue.match(regExp);

      if (!(matches !== null && matches[0] === newValue)) {
          event.preventDefault();
      }
  }


}

// Extend 'Number' class with numberFormat method
declare global {
  interface Number {
      numberFormat(decimalSize: number, separadorDecimal: string, separadorMillares: string): string;
  }
}

Number.prototype.numberFormat = function(decimalSize, separadorDecimal, separadorMillares) {

if (isNaN(this)) {
    return;
}

let signo = '';
let parteEntera = '';
let parteDecimal = '';

// numero a formatear
const numero = this;

// parte entera del numero a formatear, en formato string
const strNumber = String(Math.trunc(Number(numero) || 0));

// indice que indica a partir de que digito tenemos que dividir con los puntos para separar los millares
const index = strNumber.length > 3 ? strNumber.length % 3 : 0;

// signo del numero ('-' para num negativos y '' para positivos)
signo = numero < 0 ? '-' : '';

// separa la primera parte del numero y le pone el punto        Ej) si strNumber vale '80000000', sacaría '80.'
parteEntera = (index ? strNumber.substr(0, index) + separadorMillares : '');

// mete un punto cada tres numeros en la parte entera restante      Ej) si strNumber vale '80000000', sacaría 000.000
parteEntera = parteEntera + strNumber.substr(index).replace(/(\d{3})(?=\d)/g, '$1' + separadorMillares);

// añade la parte decimal, con tantas cifras como indique decimalSize (si decimalSize vale 0, indicaría que no queremos decimales)
parteDecimal = (decimalSize ? separadorDecimal +  Math.abs(numero - parseInt(strNumber)).toFixed(decimalSize).split('.')[1] : '');


// numero formateado
const formattedNumber = signo + parteEntera + parteDecimal;

// devolvemos el numero ya formateado
return formattedNumber;
};



