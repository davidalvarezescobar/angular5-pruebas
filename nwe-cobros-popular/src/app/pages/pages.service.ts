import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
@Injectable()
export class PagesService {
  private reutilizarEmitidos;
  private headerProgramados;
  private routeHistory;

  constructor(private router: Router) { }

  // Datos del listado de recibo al alta de recibo
  setDetail(datosRecibo) {
  console.log('PAGESSERVICE:: setDetail()' ,datosRecibo);
    this.reutilizarEmitidos = datosRecibo;
  }

  // Datos del listado de recibo al alta de recibo
  getDetail() {
    console.log('PAGESSERVICE:: getDetail()' ,this.reutilizarEmitidos);
    return this.reutilizarEmitidos;
  }

  setHeaderProgramados(headerData) {
    this.headerProgramados = headerData;
  }

  getHeaderProgramados() {
    return this.headerProgramados;
  }

  getRouterHistory() {
    return this.routeHistory;
  }

  setRouteHistory() {
    this.routeHistory = this.router.url;
  }

}
