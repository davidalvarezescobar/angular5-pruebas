import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pst-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.less']
})
export class FirmaComponent implements OnInit {

  @Output() signatureKey: EventEmitter<any> = new EventEmitter();
  @Output() canceled: EventEmitter<any> = new EventEmitter();

  firmaCorrecta = false;

  positions: any;
  signature: any;
  numeroPosiciones = 0;
  signaturePositionsArray: string[];
  keyNormal: any[] = ['', '', '', '', '', '', '', '', ''];

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init() {
    let posiciones = [];
    let arr = ['X', 'B', 'X', 'B', 'B', 'B', 'X', 'B', 'B'];
    this.signaturePositionsArray = arr;

    for (let i=0, len=arr.length; i<len; i++) {
      if (arr[i] === 'X') {
        posiciones.push(i+1);
        this.numeroPosiciones = this.numeroPosiciones + 1;
      }
    }
    this.positions = posiciones.slice(0, -1).join(', ') + ' y ' + posiciones.slice(-1) + ' ';
  }

  onChangePosition(key, position) {

    var elements = Array.from(document.querySelectorAll('input.inputElement'));

    for(let i = 0; i < elements.length; i++) {
      let val = (<HTMLInputElement>elements[i]).value;
      if(val == '' || val == undefined || val == null) {
        (<HTMLInputElement>elements[i]).focus();
        break;
      }
    }


    this.signature = '';
    key = key ? key : 'X';

    this.keyNormal.forEach((chr, index) => {
      if (chr !== '' && index!==0) {
        this.signature = this.signature + ((index) + chr);
      }

    });
    if (this.signature.length/2 === this.numeroPosiciones) {
      this.firmaCorrecta = true;
    } else {
      this.firmaCorrecta = false;
    }
  }

  confirm() {
    this.signatureKey.emit('Firma correcta')
  }

  cancel() {
    this.canceled.emit();
  }

}
