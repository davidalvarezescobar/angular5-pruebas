import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'nwe-filtros-listado-programados',
  templateUrl: './filtros-listado-programados.component.html',
  styleUrls: ['./filtros-listado-programados.component.less']
})
export class FiltrosListadoProgramadosComponent implements OnInit {

  @Output() filtersClicked = new EventEmitter<any>();

  form: FormGroup;

  configAmount: {
    integerSize: number,
    decimalSize: number,
  };

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      fromDate: new Date(),
      toDate: new Date(),
      fromAmount: '100',
      toAmount: '1000',
      reference: 'reference',
      ebankCode: 1
    });

    this.configAmount = {
      integerSize: 15,
      decimalSize: 2
    };
  }

  /*
  ?fromDate=26/06/2018
  &toDate=26/06/2019
  &fromAmount=100
  &toAmount=1000
  &reference=reference
  &ebankCode=1

  */
  ngOnInit() {
  }

  onSubmit() {
    this.filtersClicked.emit(this.form.value);
  }

  // Funcionalidad del input number
  // Elimina los puntos(separador de miles).
  removeDots(model,indicator) {
    if(model) {
    const result = model.replace(/\./g, '');
    if(indicator === 'F') {
      this.form.patchValue({
        fromAmount: result,
      });
    }else {
      this.form.patchValue({
        toAmount: result,
      });
    }
    }
  }

  // Funcionalidad del input number
  // Formatea el importe en separador miles y decimales.
  format(model,indicator) {
    if(model) {
      let separadorMillares = '.';
      let separadorDecimal = ',';
      let decimalSize = this.configAmount.decimalSize;

      const result = parseFloat(model.replace(/\./g, '').replace(',', '.')).numberFormat(decimalSize, separadorDecimal, separadorMillares);

      if(indicator === 'F') {
        this.form.patchValue({
          fromAmount: result,
        });
      }else {
        this.form.patchValue({
          toAmount: result,
        });
      }
    }
  }

  // Funcionalidad del input number
  // En cada pulsación de tecla comprueba que sea un caracterer numérico.
  mask(event, model, indicator) {

      // Convert charCode to char
      let char = String.fromCharCode(event.charCode);

      // Get future value
      let selectionStart = event.currentTarget.selectionStart;
      let selectionEnd = event.currentTarget.selectionEnd;
      let newValue = char;
      if(model) {
        newValue = model.substring(0, selectionStart) + char + model.substring(selectionEnd);
      }

      // Apply mask
      let regExpString = '[0-9]{1,$integerSize}(\,[0-9]{0,$decimalSize})?';

      regExpString = regExpString.replace('$integerSize', this.configAmount.integerSize.toString());
      regExpString = regExpString.replace('$decimalSize', this.configAmount.decimalSize.toString());

      let regExp = new RegExp(regExpString);
      let matches = newValue.match(regExp);

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
let numero = this;

// parte entera del numero a formatear, en formato string
let strNumber = String(Math.trunc(Number(numero) || 0));

// indice que indica a partir de que digito tenemos que dividir con los puntos para separar los millares
let index = strNumber.length > 3 ? strNumber.length % 3 : 0;

// signo del numero ('-' para num negativos y '' para positivos)
signo = numero < 0 ? '-' : '';

// separa la primera parte del numero y le pone el punto        Ej) si strNumber vale '80000000', sacaría '80.'
parteEntera = (index ? strNumber.substr(0, index) + separadorMillares : '');

// mete un punto cada tres numeros en la parte entera restante      Ej) si strNumber vale '80000000', sacaría 000.000
parteEntera = parteEntera + strNumber.substr(index).replace(/(\d{3})(?=\d)/g, '$1' + separadorMillares);

// añade la parte decimal, con tantas cifras como indique decimalSize (si decimalSize vale 0, indicaría que no queremos decimales)
parteDecimal = (decimalSize ? separadorDecimal +  Math.abs(numero - parseInt(strNumber)).toFixed(decimalSize).split('.')[1] : '');


// numero formateado
let formattedNumber = signo + parteEntera + parteDecimal;

// devolvemos el numero ya formateado
return formattedNumber;
};
