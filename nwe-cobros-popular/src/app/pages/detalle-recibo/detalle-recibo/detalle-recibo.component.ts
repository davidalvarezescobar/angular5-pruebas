import { Component, OnInit } from '@angular/core';
import { DetalleReciboService } from './../detalle-recibo.service';

@Component({
  selector: 'nwe-detalle-recibo',
  templateUrl: './detalle-recibo.component.html',
  styleUrls: ['./detalle-recibo.component.less']
})
export class DetalleReciboComponent implements OnInit {

  configHeader = {
    title: 'Detalle del recibo',
    iconPrint: true
  };

  data;

  constructor(
    private detalleService: DetalleReciboService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.detalleService.getData().subscribe(data => this.data = data);
  }

  actionHeader(typeClick) {
    console.log('typeClick', typeClick);
    switch(typeClick) {
      case 'PDF':
        console.log('Pdf clicked');
        break;
      case 'TXT':
        console.log('Txt clicked');
        break;
      case 'EXCEL':
        console.log('Excel clicked');
        break;
      case 'PRINT':
        console.log('Print clicked');
        break;
    }
  }

}
