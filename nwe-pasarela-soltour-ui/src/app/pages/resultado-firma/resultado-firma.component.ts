import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { InternalRoutes } from './../../services/constants';
import { PagesService } from './../pages.service';
import { IDetallePagoInfo } from './../interfaces';

@Component({
  selector: 'pst-resultado-firma',
  templateUrl: './resultado-firma.component.html',
  styleUrls: ['./resultado-firma.component.less']
})
export class ResultadoFirmaComponent implements OnInit {

  dataResultado;

  constructor(private pagesService: PagesService, private router: Router) { }

  ngOnInit() {
    this.initDetalle();
  }

  initDetalle() {
    if(this.pagesService.getResultadoFirma()) {
      this.dataResultado = this.pagesService.getResultadoFirma();
    } else {
      this.router.navigateByUrl(InternalRoutes.buscadorContratos);
    }
  }

  goToOperaciones() {
    this.router.navigateByUrl(InternalRoutes.operacionesPendientesFirma);
  }

}
