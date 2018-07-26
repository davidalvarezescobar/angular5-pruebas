import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from './../../../pages.service';

import  { ListadoDeCobrosService } from './../../listado-de-cobros.service';

@Component({
  selector: 'nwe-tabla-listado',
  templateUrl: './tabla-listado.component.html',
  styleUrls: ['./tabla-listado.component.less']
})
export class TablaListadoComponent implements OnInit {

  @Input() data;

  configDropdown = {
    options: [
      {name: 'Reutilizar', value: 'reutilizar'},
      {name: 'Ver detalle', value: 'detalle'}
    ]
  }

  constructor(
    private router: Router,
    private pagesService: PagesService,
    private ldcService: ListadoDeCobrosService
  ) { }

  ngOnInit() { }

  clickedOption(option) {
    console.log('option',option);
    switch (option) {
      case 'reutilizar':
        this.goToReutility();
      case 'detalle':
        this.goToDetail();
    }
  }

  goToReutility() {
    this.ldcService.getDetail().subscribe(data => {
      this.pagesService.setDetail(data);
      this.router.navigateByUrl('alta-de-cobros');
    });
  }

  goToDetail() {
    this.ldcService.getDetail().subscribe(data => {
      this.pagesService.setDetail(data);
      this.router.navigateByUrl('detalle-de-recibo');
    });
  }

}
