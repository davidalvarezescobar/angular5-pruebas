import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../pages.service';

import { ListadoDeCobrosService } from './../listado-de-cobros.service';

@Component({
  selector: 'nwe-listado-de-cobros',
  templateUrl: './listado-de-cobros.component.html',
  styleUrls: ['./listado-de-cobros.component.less']
})
export class ListadoDeCobrosComponent implements OnInit {

  configHeader = {
    title: 'Consultar emitidos',
    iconFdf: true,
    iconTxt: true,
    iconExcel: true,
    iconPrint: true
  };

  configTable;

  constructor(
    public ldcService: ListadoDeCobrosService,
    private pagesService: PagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.ldcService.getData().subscribe(data => {
      console.log('component listado-cobros',data)
      this.configTable = data;
    });
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
