import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AltaDeCobrosService } from '../../alta-de-cobros.service';
import { PagesService } from './../../../pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nwe-buscador-contratos',
  templateUrl: './buscador-contratos.component.html',
  styleUrls: ['./buscador-contratos.component.less']
})
export class BuscadorContratosComponent implements OnInit {
  contratos$;
  selectedContrato;
  configHeader = {
    title: 'Cuentas de abono - Acreedores'
  };
  routeHistory;

  disabledButton = true;

  constructor(
    private altaService: AltaDeCobrosService,
    private location: Location,
    private pagesService: PagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contratos$ = this.altaService.getContratos();
    this.routeHistory = this.pagesService.getRouterHistory();
    console.log('routeHistory', this.routeHistory);
  }

  select(contrato) {
    this.disabledButton = false;
    this.selectedContrato = contrato;
  }

  cancelar() {
    this.location.back();
  }

  continuar() {
    if (this.selectedContrato) {
      this.altaService.saveContrato(this.selectedContrato);
      this.location.back();
    }
  }

  consultar(){
    if (this.selectedContrato) {
      this.altaService.saveContrato(this.selectedContrato);
      this.router.navigateByUrl('/listado-programados');
    }
  }
}
