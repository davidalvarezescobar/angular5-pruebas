import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from './../../../pages.service';

import { ListadoProgramadosService } from './../../listado-programados.service';

@Component({
  selector: 'nwe-tabla-listado-programados',
  templateUrl: './tabla-listado-programados.component.html',
  styleUrls: ['./tabla-listado-programados.component.less']
})
export class TablaListadoProgramadosComponent implements OnInit {

  @Input() data;
  
  constructor(
    private router: Router,
    private pagesService: PagesService,
    private lpService: ListadoProgramadosService
  ) { }

  ngOnInit() { }

  clickedOption(option) {
    console.log('option',option);
    switch (option) {
      case 'modificar':
        this.rowModified();
      case 'eliminar':
        this.rowDelete();
      case 'reutilizar':
        this.rowReutility();
      case 'emision':
        this.rowView();
    }
  }

  referenceSelected() {

  }

  rowModified() {
    // this.router.navigateByUrl('modificacion-de-cobros');
  }

  rowDelete() {

  }

  // ver emitidos
  rowView() {
    this.router.navigate(['listado-de-cobros']);
  }

  rowReutility() {
    this.lpService.getDetail().subscribe(data => {
      this.pagesService.setDetail(data);
      this.router.navigateByUrl('alta-de-cobros');
    });
  }

}
