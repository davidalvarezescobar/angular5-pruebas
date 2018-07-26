import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../pages.service';
import { ListadoProgramadosService } from './../listado-programados.service';

import { FiltrosListadoProgramadosComponent } from './../components/filtros-listado-programados/filtros-listado-programados.component';

@Component({
  selector: 'nwe-listado-programados',
  templateUrl: './listado-programados.component.html',
  styleUrls: ['./listado-programados.component.less']
})
export class ListadoProgramadosComponent implements OnInit {

  // acceso a la inicialización de los valores del formulario por defecto
  // this.filters.form.value
  @ViewChild(FiltrosListadoProgramadosComponent) filters: FiltrosListadoProgramadosComponent;

  configHeader = {
    title: 'Consultar programados',
    iconFdf: true,
    iconTxt: true,
    iconExcel: true,
    iconPrint: true
  };

  textBox = {
    text: 'La información que se muestra en pantalla corresponde a los próximos 4 meses. si desea información posterior selecciona un periodo de fechas.'
  };

  tableData;
  headerData;

  constructor(
    private pagesService: PagesService,
    private lpService: ListadoProgramadosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.init(this.filters.form.value);
  }

  init(params) {
    this.lpService.getData(params).subscribe(data => this.tableData = data);
    this.headerData = this.pagesService.getHeaderProgramados();
    console.log('Page Programados:: getHeaderProgramados()', this.pagesService.getHeaderProgramados());
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

  applyFilters(filters) {
    console.log(filters);
  }

}
